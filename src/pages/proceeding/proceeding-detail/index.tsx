/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FileDetail from '@/components/detail/FileDetail';
import useDataMatch from '@/router/hooks/use-data-match';

import { proceedingData } from '..';

const index = () => {
  const navigate = useNavigate();
  const data = useDataMatch(proceedingData);

  useEffect(() => {
    if (!data) {
      navigate('/404');
    }
  }, [data, navigate]);

  if (!data) {
    return null;
  }

  return <FileDetail data={data} />;
};

export default index;
