/* eslint-disable react-hooks/rules-of-hooks */

import FileDetail from '@/components/detail/FileDetail';
import { usePathname } from '@/router/hooks';
import { useGetRuleDetail } from '@/store/ruleStore';

const index = () => {
  const id = usePathname().split('/')[2];
  const { data } = useGetRuleDetail(parseInt(id, 10));

  if (!data) {
    return null;
  }

  return <FileDetail data={data} />;
};

export default index;
