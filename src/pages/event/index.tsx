import { EventContent } from '@/api/types';
import ListTable from '@/components/list-table';
import { useGetEvents } from '@/store/eventStore';

export default function Event() {
  const { data } = useGetEvents('단과대');
  const allContent: EventContent[] = data?.pages.flatMap((page) => page.content) ?? [];
  return <ListTable data={allContent} route="/event/upload" title="행사 목록" />;
}
