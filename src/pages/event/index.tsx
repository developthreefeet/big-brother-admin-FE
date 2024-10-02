import ListTable from '@/components/list-table';
import { useEventStore } from '@/store/eventStore';

export default function Event() {
  const { events } = useEventStore();

  return <ListTable data={events} route="/event/upload" title="행사 목록" />;
}
