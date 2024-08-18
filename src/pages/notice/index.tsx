import ListTable from '@/components/list-table';
import { useNoticeStore } from '@/store/noticeStore';

function Notice() {
  const { notices } = useNoticeStore();

  return <ListTable data={notices} route="/notice/upload" title="공지사항 목록" />;
}

export default Notice;
