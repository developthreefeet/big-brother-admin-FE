import ListTable from '@/components/list-table';
import { DataType } from '@/components/list-table/types';

export const faqData: DataType[] = [
  {
    key: '1',
    id: '111',
    title: '질문1',
    upload_date: '2024/07/23',
    edit_date: '2024/07/24',
    content: '질문 내용',
  },
  {
    key: '2',
    id: '112',
    title: '질문2',
    upload_date: '2024/07/23',
    edit_date: '2024/07/24',
    content: '질문 내용',
  },
];

function Faq() {
  return <ListTable data={faqData} route="/faq/upload" title="FAQ 목록" />;
}

export default Faq;
