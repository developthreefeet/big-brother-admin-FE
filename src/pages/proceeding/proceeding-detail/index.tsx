/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import FileDetail from '@/components/detail/FileDetail';
import UploadFileComponent from '@/components/upload-file';
import useDataMatch from '@/router/hooks/use-data-match';
import useEditStore from '@/store/editStore';

import { proceedingData } from '..';

const index = () => {
  const data = useDataMatch(proceedingData);
  const { isEditing, resetEditing } = useEditStore();
  const location = useLocation();

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
