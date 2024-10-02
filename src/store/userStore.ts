import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

import userService, { SignInReq } from '@/api/services/userService';
import { getItem, removeItem, setItem } from '@/utils/storage';

import { UserInfo, UserToken } from '#/entity';
import { StorageEnum } from '#/enum';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  // 使用 actions 命名空间来存放所有的 action
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

const useUserStore = create<UserStore>((set) => ({
  userInfo: getItem<UserInfo>(StorageEnum.User) || {},
  userToken: getItem<UserToken>(StorageEnum.Token) || {},
  actions: {
    setUserInfo: (userInfo) => {
      set({ userInfo });
      setItem(StorageEnum.User, userInfo);
    },
    setUserToken: (userToken) => {
      set({ userToken });
      setItem(StorageEnum.Token, userToken);
    },
    clearUserInfoAndToken() {
      set({ userInfo: {}, userToken: {} });
      removeItem(StorageEnum.User);
      removeItem(StorageEnum.Token);
    },
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserPermission = () => useUserStore((state) => state.userInfo.permissions);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useSignIn = () => {
  const navigatge = useNavigate();
  const { message } = App.useApp();
  const { setUserToken /* , setUserInfo */ } = useUserActions();

  const cookies = new Cookies();

  const signInMutation = useMutation({
    mutationFn: userService.signin,
  });

  const signIn = async (data: SignInReq) => {
    try {
      const res = await signInMutation.mutateAsync(data);

      const { /* user, */ accessToken, refreshToken } = res;
      console.log(accessToken);
      setUserToken({ accessToken, refreshToken });
      cookies.set('accessToken', accessToken, { maxAge: 60 * 60 * 24 * 30 });
      cookies.set('refreshToken', refreshToken, { maxAge: 60 * 60 * 24 * 30 });
      // setUserInfo(user);
      navigatge(HOMEPAGE, { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const statusCode = err.response.status;
        // 수정 필요
        if (statusCode === 404 || statusCode === 500) {
          message.warning({
            content: '이메일이나 비밀번호가 맞지 않습니다.',
            duration: 3,
          });
        } else {
          message.warning({
            content: err.response.data?.message || '로그인 중 오류가 발생했습니다.',
            duration: 3,
          });
        }
      } else {
        message.warning({
          content: '로그인 중 오류가 발생했습니다.',
          duration: 3,
        });
      }
    }
  };

  return signIn;
};

export default useUserStore;
