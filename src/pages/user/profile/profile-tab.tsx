import { Typography } from 'antd';

import Card from '@/components/card';
import { Iconify } from '@/components/icon';
import { useUserInfo } from '@/store/userStore';

export default function ProfileTab() {
  const { email, username } = useUserInfo();

  const AboutItems = [
    { icon: <Iconify icon="fa-solid:user" size={18} />, label: '이름', val: username },
    { icon: <Iconify icon="eos-icons:role-binding" size={18} />, label: '역할', val: 'Admin' },
    { icon: <Iconify icon="ic:baseline-email" size={18} />, label: 'Email', val: email },
  ];

  return (
    <div className="w-full">
      <Card className="flex-col">
        <div className="flex w-full flex-col">
          <Typography.Title level={5}>프로필 정보</Typography.Title>
          <div className="mt-2 flex flex-col gap-4">
            {AboutItems.map((item, index) => (
              <div className="flex" key={index}>
                <div className="mr-2">{item.icon}</div>
                <div className="mr-2">{item.label}:</div>
                <div className="opacity-50">{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
