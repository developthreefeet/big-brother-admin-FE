/* eslint-disable react-hooks/rules-of-hooks */

import CommonDetail from '@/components/detail/CommonDetail';
import useDataMatch from '@/router/hooks/use-data-match';

import { noticeData } from '..';

const index = () => {
  const data = useDataMatch(noticeData);

  if (!data) {
    return null;
  }

  return <CommonDetail data={data} />;
};

export default index;
