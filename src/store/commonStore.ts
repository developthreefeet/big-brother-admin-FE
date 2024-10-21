import { useMutation, useQueryClient } from '@tanstack/react-query';

import contentService from '@/api/services/contentService';
import { RequestName } from '@/api/types';

export const useDeleteContent = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { ids: React.Key[]; requestName: RequestName }>({
    mutationKey: ['deleteNotice'],
    mutationFn: async ({ ids, requestName }) => {
      await contentService.deleteContent(ids, requestName);
    },
    onSuccess: (_data, { requestName }) => {
      console.log('deleted successfully');
      queryClient.invalidateQueries({ queryKey: [requestName] });
    },
    onError: (error) => {
      console.error('Error deleting:', error);
    },
  });
};
