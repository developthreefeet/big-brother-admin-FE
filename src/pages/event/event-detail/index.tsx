/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CommonDetail from '@/components/detail/CommonDetail';
import useDataMatch from '@/router/hooks/use-data-match';

import { eventData } from '..';

const index = () => {
  const navigate = useNavigate();
  const data = useDataMatch(eventData);

  useEffect(() => {
    if (!data) {
      navigate('/404');
    }
  }, [data, navigate]);

  if (!data) {
    return null;
  }

  return <CommonDetail data={data} />;
};

export default index;
