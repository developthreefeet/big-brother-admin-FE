/* eslint-disable react-hooks/rules-of-hooks */

import FileDetail from '@/components/detail/FileDetail';
import useDataMatch from '@/router/hooks/use-data-match';
import { useRuleStore } from '@/store/ruleStore';

const index = () => {
  const { rules } = useRuleStore();
  const data = useDataMatch(rules);

  if (!data) {
    return null;
  }

  return <FileDetail data={data} />;
};

export default index;
