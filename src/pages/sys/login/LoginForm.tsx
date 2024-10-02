import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SignInReq } from '@/api/services/userService';
import { useSignIn } from '@/store/userStore';

import { LoginStateEnum, useLoginStateContext } from './providers/LoginStateProvider';

function LoginForm() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const { loginState } = useLoginStateContext();
  const signIn = useSignIn();

  if (loginState !== LoginStateEnum.LOGIN) return null;

  const handleFinish = async ({ memberEmail, memberPass }: SignInReq) => {
    setLoading(true);
    try {
      await signIn({ memberEmail, memberPass });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mb-4 text-xl font-bold xl:text-xl">{t('로그인')}</div>
      <Form name="login" size="large" onFinish={handleFinish}>
        <Form.Item
          name="memberEmail"
          rules={[{ required: true, message: t('이메일을 입력해주세요.') }]}
        >
          <Input type="memberEmail" placeholder={t('이메일')} />
        </Form.Item>
        <Form.Item
          name="memberPass"
          rules={[{ required: true, message: t('비밀번호를 입력해주세요.') }]}
        >
          <Input.Password type="memberPass" placeholder={t('비밀번호')} />
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
