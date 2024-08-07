/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import CommonDetail from '@/components/detail/CommonDetail';
import UploadContent from '@/components/upload-content';
import useDataMatch from '@/router/hooks/use-data-match';
import editStore from '@/store/editStore';

import { eventData } from '..';

const index = () => {
  const data = useDataMatch(eventData);
  const { isEditing, resetEditing } = editStore();
  const location = useLocation();

  useEffect(() => {
    return () => resetEditing();
  }, [location, resetEditing]);

  if (!data) {
    return null;
  }

  return (
    <div>
      {isEditing ? <UploadContent title="행사 수정" data={data} /> : <CommonDetail data={data} />}
    </div>
  );
};

export default index;
