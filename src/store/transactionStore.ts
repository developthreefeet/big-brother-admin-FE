import { useMutation, useQuery } from '@tanstack/react-query';

import contentService from '@/api/services/contentService';
import { PostRes } from '@/api/types';

export const useGetTransaction = (affiliation: string, year: number, month: number) => {
  return useQuery({
    queryKey: ['transaction', affiliation, year, month],
    queryFn: async () => {
      const data = await contentService.getTransactions({ affiliation, year, month });
      return data;
    },
  });
};

export const usePostTransaction = () => {
  return useMutation<PostRes, Error, { affiliationId: number; newTransaction: FormData }>({
    mutationKey: ['postTransaction'],
    mutationFn: async ({ affiliationId, newTransaction }) => {
      const data = await contentService.postTransaction(affiliationId, newTransaction);
      return data;
    },
  });
};
