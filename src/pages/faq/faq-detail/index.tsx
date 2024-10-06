/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import CommonDetail from '@/components/detail/CommonDetail';
import UploadContent from '@/components/upload-content';
import { usePathname } from '@/router/hooks';
import useEditStore from '@/store/editStore';
import { useGetFAQDetail } from '@/store/faqStore';

const index = () => {
  const { isEditing, resetEditing } = useEditStore();
  const location = useLocation();

  const id = usePathname().split('/')[2];
  const { data } = useGetFAQDetail(parseInt(id, 10));

  useEffect(() => {
    return () => resetEditing();
  }, [location, resetEditing]);

  if (!data) {
    return null;
  }

  return (
    <div>
      {isEditing ? <UploadContent title="FAQ 수정" data={data} /> : <CommonDetail data={data} />}
    </div>
  );
};

export default index;
