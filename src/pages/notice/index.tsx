import ListTable from '@/components/list-table';
import { DataType } from '@/components/list-table/types';

function Notice() {
  const data: DataType[] = [
    {
      key: '1',
      title: '공지제목',
      upload_date: '2024/07/23',
    },
    {
      key: '2',
      title: '공지제목2',
      upload_date: '2024/07/23',
    },

    {
      key: '3',
      title: '공지제목3',
      upload_date: '2024/07/23',
    },

    {
      key: '4',
      title: '공지제목4',
      upload_date: '2024/07/23',
    },
  ];
  return <ListTable data={data} route="/notice/upload" title="공지사항 목록" />;
}

export default Notice;
