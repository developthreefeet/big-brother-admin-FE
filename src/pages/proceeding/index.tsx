import ListTable from '@/components/list-table';
import { DataType } from '@/components/list-table/types';

function Proceeding() {
  const data: DataType[] = [
    {
      key: '1',
      title: '회의록 제목',
      upload_date: '2024/07/23',
    },
    {
      key: '2',
      title: '회의록 제목2',
      upload_date: '2024/07/23',
    },

    {
      key: '3',
      title: '회의록 제목3',
      upload_date: '2024/07/23',
    },
  ];
  return <ListTable data={data} route="/proceeding/upload" title="회의록 목록" />;
}

export default Proceeding;
