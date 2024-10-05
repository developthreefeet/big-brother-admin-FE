import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import contentService from '@/api/services/contentService';
import { ProceedingContent } from '@/components/list-table/types';

export const useGetProceedings = (affiliation: string) => {
  return useInfiniteQuery({
    queryKey: ['proceeding', affiliation],
    queryFn: async ({ pageParam = 0 }) => {
      const result = await contentService.getProceedings({
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

export const useGetProceedingDetail = (proceedingId: number) => {
  return useQuery({
    queryKey: ['proceedingDetail', proceedingId],
    queryFn: async () => {
      const data = await contentService.getProceedingDetail(proceedingId);
      return data;
    },
  });
};

/// 추후 없애야 함 (일단 전체 리스트 get만 구현해두었기 때문에)

interface ProceedingState {
  proceedings: ProceedingContent[];
  addProceeding: (proceeding: ProceedingContent) => void;
  updateProceeding: (id: number, updatedProceeding: Partial<ProceedingContent>) => void;
}

export const useProceedingStore = create<ProceedingState>()(
  persist(
    (set) => ({
      proceedings: [
        {
          id: 32,
          title: '8월 회의록',
          createAt: '2024-08-23',
          updateAt: '2024-08-24',
          content: '',
          affiliationId: 12,
        },
        {
          id: 14,
          title: '7월 회의록',
          createAt: '2024-07-23',
          updateAt: '2024-07-24',
          content: '',
          affiliationId: 13,
        },
      ],
      addProceeding: (proceeding) =>
        set((state) => ({ proceedings: [...state.proceedings, proceeding] })),
      updateProceeding: (id, updatedProceeding) =>
        set((state) => ({
          proceedings: state.proceedings.map((proeeding) =>
            proeeding.id === id ? { ...proeeding, ...updatedProceeding } : proeeding,
          ),
        })),
    }),
    {
      name: 'proceeding-storage',
    },
  ),
);
