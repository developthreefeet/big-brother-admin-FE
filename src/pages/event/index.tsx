import ListTable from '@/components/list-table';
import { DataType } from '@/components/list-table/types';

export default function Event() {
  const data: DataType[] = [
    {
      key: '1',
      title: '행사제목',
      upload_date: '2024/07/23',
    },
    {
      key: '2',
      title: '행사제목2',
      upload_date: '2024/07/23',
    },

    {
      key: '3',
      title: '행사제목3',
      upload_date: '2024/07/23',
    },

    {
      key: '4',
      title: '행사제목4',
      upload_date: '2024/07/23',
    },
  ];
  return <ListTable data={data} route="/event/upload" title="행사 목록" />;
}
