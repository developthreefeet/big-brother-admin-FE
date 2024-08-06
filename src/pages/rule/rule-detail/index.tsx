import FileDetail from '@/components/detail/FileDetail';
import useDataMatch from '@/router/hooks/use-data-match';

import { ruleData } from '..';

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = useDataMatch(ruleData);

  if (!data) {
    return null;
  }

  return <FileDetail data={data} />;
};

export default index;
