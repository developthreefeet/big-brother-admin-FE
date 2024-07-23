import { CSSProperties, useState } from 'react';
import { FaUserLarge } from 'react-icons/fa6';

import Card from '@/components/card';
import { Iconify } from '@/components/icon';
import { useUserInfo } from '@/store/userStore';
import { useThemeToken } from '@/theme/hooks';

import ProfileTab from './profile-tab';

function UserProfile() {
  const { username } = useUserInfo();
  const { colorTextBase } = useThemeToken();
  const [currentTabIndex, setcurrentTabIndex] = useState(0);

  const bgStyle: CSSProperties = {
    background: `linear-gradient(90deg, rgba(96,26,54,1) 35%, rgba(113,25,53,1) 44%, rgba(202,255,176,1) 100%)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  };

  const tabs = [
    {
      icon: <Iconify icon="solar:user-id-bold" size={24} className="mr-2" />,
      title: 'Profile',
      content: <ProfileTab />,
    },
  ];

  return (
    <>
      <Card className="relative mb-6 h-[290px] flex-col rounded-2xl !p-0">
        <div style={bgStyle} className="h-full w-full">
          <div className="flex flex-col items-center justify-center pt-12 md:absolute md:bottom-6 md:left-6 md:flex-row md:pt-0">
            <FaUserLarge size="80" color="black" />
            <div
              className="ml-6 mt-6 flex flex-col justify-center md:mt-0"
              style={{ color: '#fff' }}
            >
              <span className="mb-2 text-2xl font-medium">{username}</span>
            </div>
          </div>
        </div>
        <div className="z-10 min-h-[48px] w-full">
          <div className="mx-6 flex h-full justify-center md:justify-end">
            {tabs.map((tab, index) => (
              <button
                onClick={() => setcurrentTabIndex(index)}
                key={tab.title}
                type="button"
                style={{
                  marginRight: index >= tabs.length - 1 ? '0px' : '40px',
                  opacity: index === currentTabIndex ? 1 : 0.5,
                  borderBottom: index === currentTabIndex ? `2px solid ${colorTextBase}` : '',
                }}
              >
                {tab.icon}
                {tab.title}
              </button>
            ))}
          </div>
        </div>
      </Card>
      <div>{tabs[currentTabIndex].content}</div>
    </>
  );
}

export default UserProfile;
