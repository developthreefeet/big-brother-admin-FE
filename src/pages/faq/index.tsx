import ListTable from '@/components/list-table';
import { DataType } from '@/components/list-table/types';

function Faq() {
  const data: DataType[] = [
    {
      key: '1',
      title: '질문1',
      upload_date: '2024/07/23',
    },
    {
      key: '2',
      title: '질문2',
      upload_date: '2024/07/23',
    },
  ];
  return <ListTable data={data} route="/faq/upload" title="FAQ 목록" />;
}

export default Faq;
