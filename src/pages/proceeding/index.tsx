import { ProceedingContent } from '@/api/types';
import ListTable from '@/components/list-table';
import { useGetProceedings } from '@/store/proceedingStore';

function Proceeding() {
  const { data } = useGetProceedings('단과대');
  const allContent: ProceedingContent[] = data?.pages.flatMap((page) => page.content) ?? [];
  return <ListTable data={allContent} route="/proceeding/upload" title="회의록 목록" />;
}

export default Proceeding;
