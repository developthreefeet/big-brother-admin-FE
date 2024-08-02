import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SignInReq } from '@/api/services/userService';
import { useSignIn } from '@/store/userStore';

import { LoginStateEnum, useLoginStateContext } from './providers/LoginStateProvider';

function LoginForm() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const { loginState, setLoginState } = useLoginStateContext();
  const signIn = useSignIn();

  if (loginState !== LoginStateEnum.LOGIN) return null;

  const handleFinish = async ({ email, password }: SignInReq) => {
    setLoading(true);
    try {
      await signIn({ email, password });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mb-4 text-xl font-bold xl:text-xl">{t('로그인')}</div>
      <Form name="login" size="large" onFinish={handleFinish}>
        <Form.Item name="email" rules={[{ required: true, message: t('이메일을 입력해주세요.') }]}>
          <Input type="email" placeholder={t('이메일')} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: t('비밀번호를 입력해주세요.') }]}
        >
          <Input.Password type="password" placeholder={t('비밀번호')} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
            {t('로그인')}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default LoginForm;
