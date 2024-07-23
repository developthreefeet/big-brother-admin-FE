import { lazy, Suspense } from 'react';

import { Iconify } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';

const Event = lazy(() => import('@/pages/event'));

function Wrapper({ children }: any) {
  return <Suspense fallback={<CircleLoading />}>{children}</Suspense>;
}

const event: AppRouteObject = {
  path: 'event',
  element: (
    <Wrapper>
      <Event />
    </Wrapper>
  ),
  meta: {
    label: 'event',
    icon: <Iconify icon="solar:widget-5-bold-duotone" className="ant-menu-item-icon" size="24" />,
    key: '/event',
  },
};

export default event;
