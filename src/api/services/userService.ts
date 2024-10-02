import apiClient from '../apiClient';

import { UserToken } from '#/entity';

export interface SignInReq {
  memberEmail: string;
  memberPass: string;
}

export type SignInRes = UserToken & { grantType: string };

const signin = (data: SignInReq) => apiClient.post<SignInRes>({ url: '/members/sign-in', data });
export const refresh = () => apiClient.get({ url: '/members/refresh' });
// const logout = () => apiClient.get({ url: UserApi.Logout });

export default {
  signin,
  refresh,
  // logout,
};
