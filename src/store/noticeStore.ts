import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
          title: '공지제목',
          upload_date: '2024-07-23',
          edit_date: '2024-07-24',
          content: '공지 내용',
        },
        {
          key: '2',
          id: '14',
          title: '공지제목2',
          upload_date: '2024-07-23',
          edit_date: '2024-07-24',
          content: '공지 내용',
        },
        {
          key: '3',
          id: '142',
          title: '공지제목3',
          upload_date: '2024-07-23',
          edit_date: '2024-07-24',
          content: '공지 내용',
        },
        {
          key: '4',
          id: '1234',
          title: '공지제목4',
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
