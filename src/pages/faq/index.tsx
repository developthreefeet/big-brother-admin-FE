import { ProceedingContent } from '@/api/types';
import ListTable from '@/components/list-table';
import { useGetFAQs } from '@/store/faqStore';

function Faq() {
  const { data } = useGetFAQs('총학');
  const allContent: ProceedingContent[] = data?.pages.flatMap((page) => page.content) ?? [];
  return <ListTable data={allContent} route="/faq/upload" title="FAQ 목록" />;
}

export default Faq;
