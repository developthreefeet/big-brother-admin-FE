import { Layout } from 'antd';
import Color from 'color';
import { Cookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

import DashboardImg from '@/assets/images/background/dashboard.png';
import Overlay2 from '@/assets/images/background/overlay_2.jpg';
import { useThemeToken } from '@/theme/hooks';

import LoginForm from './LoginForm';
import { LoginStateProvider } from './providers/LoginStateProvider';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

function Login() {
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');
  const { colorBgElevated } = useThemeToken();

  // 判断用户是否有权限
  if (accessToken) {
    // 如果有授权，则跳转到首页
    return <Navigate to={HOMEPAGE} replace />;
  }

  const gradientBg = Color(colorBgElevated).alpha(0.9).toString();
  const bg = `linear-gradient(${gradientBg}, ${gradientBg}) center center / cover no-repeat,url(${Overlay2})`;

  return (
    <Layout className="relative flex !min-h-screen !w-full !flex-row">
      <div
        className="hidden grow flex-col items-center justify-center gap-[80px] bg-center  bg-no-repeat md:flex"
        style={{
          background: bg,
        }}
      >
        <div className="text-3xl font-bold leading-normal lg:text-4xl xl:text-5xl">
          Big Brother Admin
        </div>
        <img className="max-w-[480px] xl:max-w-[560px]" src={DashboardImg} alt="" />
      </div>
      <div className="m-auto flex !h-screen w-full max-w-[480px] flex-col justify-center px-[16px] lg:px-[64px]">
        <LoginStateProvider>
          <LoginForm />
        </LoginStateProvider>
      </div>
    </Layout>
  );
}
export default Login;
