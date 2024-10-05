import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// 로그아웃
export const deleteToken = () => {
  cookies.remove('accessToken');
  cookies.remove('refreshToken');
};

// 날짜 포맷 변경 함수
export const formatToISOStringDate = (value: string | number | Date): string => {
  const date = new Date(value);
  return date.toISOString().split('T')[0];
};
