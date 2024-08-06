import ListTable from '@/components/list-table';
import { DataType } from '@/components/list-table/types';

export const eventData: DataType[] = [
  {
    key: '1',
    id: '11',
    title: '행사제목',
    upload_date: '2024/07/23',
    edit_date: '2024/07/24',
    content: '행사 내용',
  },
  {
    key: '2',
    id: '12',
    title: '행사제목2',
    upload_date: '2024/07/23',
    edit_date: '2024/07/24',
    content: '행사 내용',
  },

  {
    key: '3',
    id: '13',
    title: '행사제목3',
    upload_date: '2024/07/23',
    edit_date: '2024/07/24',
    content: '행사 내용',
  },

  {
    key: '4',
    id: '14',
    title: '행사제목4',
    upload_date: '2024/07/23',
    edit_date: '2024/07/24',
    content: '행사 내용',
  },
];

export default function Event() {
  return <ListTable data={eventData} route="/event/upload" title="행사 목록" />;
}
