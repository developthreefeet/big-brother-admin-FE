import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import contentService from '@/api/services/contentService';
import { PostRes } from '@/api/types';

export const useGetRules = (affiliation: string) => {
  return useInfiniteQuery({
    queryKey: ['rule', affiliation],
    queryFn: async ({ pageParam = 0 }) => {
      const result = await contentService.getRules({
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

export const useGetRuleDetail = (ruleId: number) => {
  return useQuery({
    queryKey: ['ruleIdDetail', ruleId],
    queryFn: async () => {
      const data = await contentService.getRuleDetail(ruleId);
      return data;
    },
  });
};

export const usePostRule = () => {
  return useMutation<PostRes, Error, FormData>({
    mutationKey: ['postRule'],
    mutationFn: async (newRule: FormData) => {
      const data = await contentService.postRule(newRule);
      return data;
    },
  });
};
