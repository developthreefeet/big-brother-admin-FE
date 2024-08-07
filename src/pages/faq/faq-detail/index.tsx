/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import CommonDetail from '@/components/detail/CommonDetail';
import UploadContent from '@/components/upload-content';
import useDataMatch from '@/router/hooks/use-data-match';
import editStore from '@/store/editStore';

import { faqData } from '..';

const index = () => {
  const data = useDataMatch(faqData);
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
      {isEditing ? <UploadContent title="FAQ 수정" data={data} /> : <CommonDetail data={data} />}
    </div>
  );
};

export default index;
