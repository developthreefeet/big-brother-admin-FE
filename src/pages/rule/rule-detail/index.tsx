/* eslint-disable react-hooks/rules-of-hooks */

import FileDetail from '@/components/detail/FileDetail';
import useDataMatch from '@/router/hooks/use-data-match';

import { ruleData } from '..';

const index = () => {
  const data = useDataMatch(ruleData);

  if (!data) {
    return null;
  }

  return <FileDetail data={data} />;
};

export default index;
