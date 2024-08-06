import ListTable from '@/components/list-table';
import { DataType } from '@/components/list-table/types';

export const ruleData: DataType[] = [
  {
    key: '1',
    title: '학칙제목',
    upload_date: '2024/07/23',
    id: '122',
  },
  {
    key: '2',
    title: '학칙제목2',
    upload_date: '2024/07/23',
    id: '123',
  },

  {
    key: '3',
    title: '학칙제목3',
    upload_date: '2024/07/23',
    id: '142',
  },
];

function Rule() {
  return <ListTable data={ruleData} route="/rule/upload" title="학칙/회칙 목록" />;
}

export default Rule;
