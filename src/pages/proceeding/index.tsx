import ListTable from '@/components/list-table';
import { useProceedingStore } from '@/store/proceedingStore';

function Proceeding() {
  const { proceedings } = useProceedingStore();
  return <ListTable data={proceedings} route="/proceeding/upload" title="회의록 목록" />;
}

export default Proceeding;
