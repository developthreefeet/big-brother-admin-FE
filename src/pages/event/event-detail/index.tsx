/* eslint-disable react-hooks/rules-of-hooks */

import CommonDetail from '@/components/detail/CommonDetail';
import useDataMatch from '@/router/hooks/use-data-match';

import { eventData } from '..';

const index = () => {
  const data = useDataMatch(eventData);

  if (!data) {
    return null;
  }

  return <CommonDetail data={data} />;
};

export default index;
