/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import FileDetail from '@/components/detail/FileDetail';
import UploadFileComponent from '@/components/upload-file';
import { usePathname } from '@/router/hooks';
import useEditStore from '@/store/editStore';
import { useGetProceedingDetail } from '@/store/proceedingStore';

const index = () => {
  const { isEditing, resetEditing } = useEditStore();
  const location = useLocation();

  const id = usePathname().split('/')[2];
  const { data } = useGetProceedingDetail(parseInt(id, 10));

  useEffect(() => {
    return () => resetEditing();
  }, [location, resetEditing]);

  if (!data) {
    return null;
  }

  return (
    <div>
      {isEditing ? (
        <UploadFileComponent title="회의록 수정" data={data} />
      ) : (
        <FileDetail data={data} />
      )}
    </div>
  );
};

export default index;
