import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import contentService from '@/api/services/contentService';
import { PostRes } from '@/api/types';

export const useGetEvents = (affiliation: string) => {
  return useInfiniteQuery({
    queryKey: ['event', affiliation],
    queryFn: async ({ pageParam }) => {
      const result = await contentService.getEvents({
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

export const useGetEventDetail = (eventId: number) => {
  return useQuery({
    queryKey: ['eventDetail', eventId],
    queryFn: async () => {
      const data = await contentService.getEventDetail(eventId);
      return data;
    },
  });
};

export const usePostEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<PostRes, Error, FormData>({
    mutationKey: ['postNotice'],
    mutationFn: async (newEvent: FormData) => {
      const data = await contentService.postEvent(newEvent);
      return data;
    },
    onSuccess: (data) => {
      console.log('Event posted successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['event'] });
    },
    onError: (error) => {
      console.error('Error posting event:', error);
    },
  });
};

export interface Event {
  key: string;
  id: string;
  title: string;
  upload_date: string;
  edit_date: string;
  content: string;
}

interface EventState {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updatedEvent: Partial<Event>) => void;
}

export const useEventStore = create<EventState>()(
  persist(
    (set) => ({
      events: [
        {
          key: '1',
          id: '11',
          title: '간식 행사',
          upload_date: '2024-07-23',
          edit_date: '2024-07-24',
          content: '중간고사를 맞이해, 간식 행사를 진행합니다!',
        },
        {
          key: '2',
          id: '12',
          title: '토익 문제집 나눔 행사',
          upload_date: '2024-07-23',
          edit_date: '2024-07-24',
          content: '행사 내용',
        },

        {
          key: '3',
          id: '13',
          title: '문제집 무료 나눔 행사',
          upload_date: '2024-07-23',
          edit_date: '2024-07-24',
          content: '행사 내용',
        },

        {
          key: '4',
          id: '14',
          title: '학생 인권 실태조사 참여하고, 경품을 받아가세요!',
          upload_date: '2024-07-23',
          edit_date: '2024-07-24',
          content: '행사 내용',
        },
      ],
      addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
      updateEvent: (id, updatedEvent) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, ...updatedEvent } : event,
          ),
        })),
    }),
    {
      name: 'event-storage',
    },
  ),
);
