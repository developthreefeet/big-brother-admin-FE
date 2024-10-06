/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import CommonDetail from '@/components/detail/CommonDetail';
import UploadContent from '@/components/upload-content';
import { usePathname } from '@/router/hooks';
import editStore from '@/store/editStore';
import { useGetNoticeDetail } from '@/store/noticeStore';

const index = () => {
  const { isEditing, resetEditing } = editStore();
  const location = useLocation();

  const id = usePathname().split('/')[2];
  const { data } = useGetNoticeDetail(parseInt(id, 10));

  useEffect(() => {
    return () => resetEditing();
  }, [location, resetEditing]);

  if (!data) {
    return null;
  }

  return (
    <div>
      {isEditing ? (
        <UploadContent title="공지사항 수정" data={data} />
      ) : (
        <CommonDetail data={data} />
      )}
    </div>
  );
};

export default index;
