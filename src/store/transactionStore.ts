import { useQuery } from '@tanstack/react-query';

import contentService from '@/api/services/contentService';

export const useGetTransaction = (affiliation: string, year: number, month: number) => {
  return useQuery({
    queryKey: ['transaction', affiliation, year, month],
    queryFn: async () => {
      const data = await contentService.getTransactions({ affiliation, year, month });
      return data;
    },
  });
};
