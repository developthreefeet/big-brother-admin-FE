/* eslint-disable react-hooks/rules-of-hooks */

import FileDetail from '@/components/detail/FileDetail';
import useDataMatch from '@/router/hooks/use-data-match';

import { faqData } from '..';

const index = () => {
  const data = useDataMatch(faqData);

  if (!data) {
    return null;
  }

  return <FileDetail data={data} />;
};

export default index;
