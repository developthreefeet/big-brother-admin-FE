import ListTable from '@/components/list-table';
import { DataType } from '@/components/list-table/types';

export const proceedingData: DataType[] = [
  {
    key: '1',
    title: '회의록 제목',
    upload_date: '2024/07/23',
    id: '144',
  },
  {
    key: '2',
    title: '회의록 제목2',
    upload_date: '2024/07/23',
    id: '1542',
  },

  {
    key: '3',
    title: '회의록 제목3',
    upload_date: '2024/07/23',
    id: '1234',
  },
];

function Proceeding() {
  return <ListTable data={proceedingData} route="/proceeding/upload" title="회의록 목록" />;
}

export default Proceeding;
