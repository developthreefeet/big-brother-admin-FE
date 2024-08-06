import FileDetail from '@/components/detail/FileDetail';
import useDataMatch from '@/router/hooks/use-data-match';

import { proceedingData } from '..';

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = useDataMatch(proceedingData);

  if (!data) {
    return null;
  }

  return <FileDetail data={data} />;
};

export default index;
