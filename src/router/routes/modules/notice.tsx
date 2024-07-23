import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';

const NoticeUpload = lazy(() => import(`@/pages/notice/notice-upload`));

const notice: AppRouteObject = {
  order: 1,
  path: 'notice',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: 'notice',
    icon: <SvgIcon icon="ic-analysis" className="ant-menu-item-icon" size="24" />,
    key: '/notice',
  },
  children: [
    {
      index: true,
      element: <Navigate to="upload" replace />,
    },
    {
      path: 'upload',
      element: <NoticeUpload />,
      meta: { label: 'notice upload', key: '/notice/upload' },
    },
  ],
};

export default notice;
