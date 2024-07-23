import ListTable from '@/components/list-table';
import { DataType } from '@/components/list-table/types';

function Transaction() {
  const data: DataType[] = [
    {
      key: '1',
      title: '입/출금 내역 제목',
      upload_date: '2024/07/23',
    },
    {
      key: '2',
      title: '입/출금 내역 제목2',
      upload_date: '2024/07/23',
    },

    {
      key: '3',
      title: '입/출금 내역 제목3',
      upload_date: '2024/07/23',
    },
  ];
  return <ListTable data={data} route="/transaction/upload" title="입/출금 내역 목록" />;
}

export default Transaction;
