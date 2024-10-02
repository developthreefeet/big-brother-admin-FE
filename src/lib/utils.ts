import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// 로그아웃
export const deleteToken = () => {
  cookies.remove('accessToken');
  cookies.remove('refreshToken');
};
