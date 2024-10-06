import { useInfiniteQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import contentService from '@/api/services/contentService';

export const useGetNotices = (affiliation: string) => {
  return useInfiniteQuery({
    queryKey: ['notice', affiliation],
    queryFn: async ({ pageParam }) => {
      const result = await contentService.getNotices({
        affiliation,
        page: pageParam,
        size: 7,
        search: '',
      });
      return result;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.content.length < 7) return undefined;
      return lastPage.number + 1;
    },
  });
};

export interface Notice {
  key: string;
  id: string;
  title: string;
  upload_date: string;
  edit_date: string;
  content: string;
}

interface NoticeState {
  notices: Notice[];
  addNotice: (notice: Notice) => void;
  updateNotice: (id: string, updatedNotice: Partial<Notice>) => void;
}

export const useNoticeStore = create<NoticeState>()(
  persist(
    (set) => ({
      notices: [
        {
          key: '1',
          id: '32',
          title: '수강신청 기간 공지',
          upload_date: '2024-07-23',
          edit_date: '2024-07-24',
          content: '학과 별 수강신청 기간을 공지합니다.',
        },
        {
          key: '2',
          id: '14',
          title: '명지대학교, 최우수 대학 선정!',
          upload_date: '2024-07-23',
          edit_date: '2024-07-24',
          content: '공지 내용',
        },
        {
          key: '3',
          id: '142',
          title: '졸업 유예 관련 공지사항',
          upload_date: '2024-07-23',
          edit_date: '2024-07-24',
          content: '공지 내용',
        },
      ],
      addNotice: (notice) => set((state) => ({ notices: [...state.notices, notice] })),
      updateNotice: (id, updatedNotice) =>
        set((state) => ({
          notices: state.notices.map((notice) =>
            notice.id === id ? { ...notice, ...updatedNotice } : notice,
          ),
        })),
    }),
    {
      name: 'notice-storage',
    },
  ),
);
