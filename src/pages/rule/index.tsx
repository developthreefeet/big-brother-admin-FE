import ListTable from '@/components/list-table';
import { RuleContent } from '@/components/list-table/types';
import { useGetRules } from '@/store/ruleStore';

function Rule() {
  const { data } = useGetRules('단과대');
  const allContent: RuleContent[] = data?.pages.flatMap((page) => page.content) ?? [];
  return <ListTable data={allContent} route="/rule/upload" title="학칙/회칙 목록" />;
}

export default Rule;
