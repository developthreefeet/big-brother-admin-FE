import { instance } from '@/shared/api/instance';
import { ApiResponse } from '@/shared/types';

import { GetRefreshResData } from './types';

export const REFRESH_API = {
  refresh: async () => {
    const response = await instance.get<ApiResponse<GetRefreshResData>>('/members/refresh');
    return response.data.data;
  },
};
