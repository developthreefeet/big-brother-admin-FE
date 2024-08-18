import ListTable from '@/components/list-table';
import { useRuleStore } from '@/store/ruleStore';

function Rule() {
  const { rules } = useRuleStore();
  return <ListTable data={rules} route="/rule/upload" title="학칙/회칙 목록" />;
}

export default Rule;
