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
  return useMutation<PostRes, Error, FormData>({
    mutationKey: ['postTransaction'],
    mutationFn: async (newTransaction: FormData) => {
      const data = await contentService.postRule(newTransaction);
      return data;
    },
  });
};
