import { NoticeContent } from '@/api/types';
import ListTable from '@/components/list-table';
import { useGetNotices } from '@/store/noticeStore';

function Notice() {
  const { data } = useGetNotices('총학');
  const allContent: NoticeContent[] = data?.pages.flatMap((page) => page.content) ?? [];

  return <ListTable data={allContent} route="/notice/upload" title="공지사항 목록" />;
}

export default Notice;
