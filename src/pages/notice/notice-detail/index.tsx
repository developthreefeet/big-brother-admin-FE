import CommonDetail from '@/components/detail/CommonDetail';
import useDataMatch from '@/router/hooks/use-data-match';

import { noticeData } from '..';

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = useDataMatch(noticeData);

  if (!data) {
    return null;
  }

  return <CommonDetail data={data} />;
};

export default index;
