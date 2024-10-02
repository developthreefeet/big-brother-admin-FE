import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { t } from 'i18next';
import { Cookies } from 'react-cookie';

import { refresh } from '@/api/services/userService';
import { deleteToken } from '@/shared/lib/utils';

import { Result } from '#/api';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}/api/v1`,
  timeout: 1000 * 60,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

const cookies = new Cookies();

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = cookies.get('accessToken');
    const refreshToken = cookies.get('refreshToken');

    if (accessToken && config.url !== '/members/refresh') {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (config.url === '/members/refresh') {
      config.headers.Authorization = `Bearer ${refreshToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const statusCode = error.response?.status;
    const errorCode = error.response?.data.responseCode;

    const { response, message } = error || {};

    const errMsg = response?.data?.message || message || t('sys.api.errorMessage');
    message.error(errMsg);

    if (statusCode === 400) {
      // ACCESS 토큰 만료
      if (errorCode === 'TOKEN_001') {
        try {
          // Access Token 재발급
          const refreshData = await refresh();
          cookies.set('accessToken', refreshData.accessToken, { path: '/' });
          cookies.set('refreshToken', refreshData.refreshToken, { path: '/' });

          // 기존 요청 재시도
          error.config.headers.Authorization = `Bearer ${refreshData.accessToken}`;
          return await axiosInstance.request(error.config); // 기존 요청 재시도
        } catch (refreshError: any) {
          // Refresh 토큰이 만료되었거나, 리프레시 실패 시
          deleteToken();
          // eslint-disable-next-line no-alert
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          window.location.replace('/login');
          return Promise.reject(refreshError);
        }
      }
      // Refresh 토큰이 만료된 경우
      else if (errorCode === 'TOKEN_002') {
        deleteToken();
        // eslint-disable-next-line no-alert
        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        window.location.replace('/login');
        return Promise.reject(error);
      }
    }

    // 그 외의 오류 처리
    return Promise.reject(error);
  },
);

class APIClient {
  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  put<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' });
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<any, AxiosResponse<Result>>(config)
        .then((res: AxiosResponse<Result>) => {
          resolve(res.data.data as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
        });
    });
  }
}
export default new APIClient();
