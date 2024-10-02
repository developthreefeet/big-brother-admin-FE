import axios from 'axios';
import { Cookies } from 'react-cookie';

import { REFRESH_API } from '@/features/account/api';

import { deleteToken } from '../lib/utils';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const cookies = new Cookies();

export const instance = axios.create({
  baseURL: `${baseUrl}/api/v1`,
  timeout: 1000 * 60,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
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

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const statusCode = error.response?.status;
    const errorCode = error.response?.data.responseCode;

    if (statusCode === 400) {
      // ACCESS 토큰 만료
      if (errorCode === 'TOKEN_001') {
        try {
          // Access Token 재발급
          const refreshData = await REFRESH_API.refresh();
          cookies.set('accessToken', refreshData.accessToken);
          cookies.set('refreshToken', refreshData.refreshToken);
          // 기존 요청 재시도
          error.config.headers.Authorization = `Bearer ${refreshData.accessToken}`;
          return await instance.request(error.config); // 기존 요청 재시도
        } catch (refreshError: any) {
          // Refresh 토큰이 만료되었거나, 리프레시 실패 시
          deleteToken();
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          window.location.replace('/login');
        }
      }
      // Refresh 토큰이 만료된 경우
      else if (errorCode === 'TOKEN_002') {
        deleteToken();
        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        window.location.replace('/login');
      }
    }

    if (
      error.config.url.includes('transactions') ||
      error.config.url.includes('notice') ||
      error.config.url.includes('meetings') ||
      error.config.url.includes('faq') ||
      error.config.url.includes('event') ||
      error.config.url.includes('rule') ||
      error.config.url.includes('campusnotice')
    ) {
      window.location.replace('/404');
    }
    return Promise.reject(error);
  },
);
