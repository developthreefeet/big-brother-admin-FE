import ListTable from '@/components/list-table';
import { DataType } from '@/components/list-table/types';

function Notice() {
  const data: DataType[] = [
    {
      key: '1',
      id: '32',
      title: '공지제목',
      upload_date: '2024/07/23',
      edit_date: '2024/07/24',
      content: '공지 내용',
    },
    {
      key: '2',
      id: '14',
      title: '공지제목2',
      upload_date: '2024/07/23',
      edit_date: '2024/07/24',
      content: '공지 내용',
    },

    {
      key: '3',
      id: '142',
      title: '공지제목3',
      upload_date: '2024/07/23',
      edit_date: '2024/07/24',
      content: '공지 내용',
    },

    {
      key: '4',
      id: '1234',
      title: '공지제목4',
      upload_date: '2024/07/23',
      edit_date: '2024/07/24',
      content: '공지 내용',
    },
  ];
  return <ListTable data={data} route="/notice/upload" title="공지사항 목록" />;
}

export default Notice;
