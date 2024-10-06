import { useInfiniteQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import contentService from '@/api/services/contentService';

export const useGetFAQs = (affiliation: string) => {
  return useInfiniteQuery({
    queryKey: ['faq', affiliation],
    queryFn: async ({ pageParam }) => {
      const result = await contentService.getFAQs({
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

// 아래 코드는 mock data로 사용

export interface FAQ {
  key: string;
  id: string;
  title: string;
  upload_date: string;
  edit_date: string;
  content: string;
}

interface FaqState {
  faqs: FAQ[];
  addFaq: (faq: FAQ) => void;
  updateFaq: (id: string, updatedFaq: Partial<FAQ>) => void;
}

export const useFaqStore = create<FaqState>()(
  persist(
    (set) => ({
      faqs: [
        {
          key: '1',
          id: '11',
          title: '비밀번호를 잊은 경우에는 어떻게 되나요?',
          upload_date: '2024-07-23',
          edit_date: '2024-07-24',
          content: '가입하신 이메일로 인증을 받으신 뒤, 비밀번호를 변경할 수 있습니다!',
        },
        {
          key: '2',
          id: '12',
          title: '이런 경우는 어떻게 되나요',
          upload_date: '2024-07-23',
          edit_date: '2024-07-24',
          content: '행사 내용',
        },

        {
          key: '3',
          id: '13',
          title: '이런 문제가 생겼을 때 어디로 연락을 해봐야 하나요?',
          upload_date: '2024-07-23',
          edit_date: '2024-07-24',
          content: '행사 내용',
        },

        {
          key: '4',
          id: '14',
          title: '이러한 경우에는 어떻게 해야 할까요?',
          upload_date: '2024-07-23',
          edit_date: '2024-07-24',
          content: '행사 내용',
        },
      ],
      addFaq: (faq) => set((state) => ({ faqs: [...state.faqs, faq] })),
      updateFaq: (id, updatedFaq) =>
        set((state) => ({
          faqs: state.faqs.map((faq) => (faq.id === id ? { ...faq, ...updatedFaq } : faq)),
        })),
    }),
    {
      name: 'faq-storage',
    },
  ),
);
