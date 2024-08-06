/* eslint-disable react-hooks/rules-of-hooks */

import CommonDetail from '@/components/detail/CommonDetail';
import useDataMatch from '@/router/hooks/use-data-match';

import { ruleData } from '..';

const index = () => {
  const data = useDataMatch(ruleData);

  if (!data) {
    return null;
  }

  return <CommonDetail data={data} />;
};

export default index;
