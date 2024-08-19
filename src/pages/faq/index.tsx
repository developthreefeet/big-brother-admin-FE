import ListTable from '@/components/list-table';
import { useFaqStore } from '@/store/faqStore';

function Faq() {
  const { faqs } = useFaqStore();
  return <ListTable data={faqs} route="/faq/upload" title="FAQ 목록" />;
}

export default Faq;
