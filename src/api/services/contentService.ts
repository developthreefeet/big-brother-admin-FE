import apiClient from '../apiClient';
import {
  GetProceedingResData,
  GetProceedingDetailResData,
  GetRuleResData,
  GetRuleDetailResData,
  GetTransactionResData,
} from '../types';

export interface GetContentParams {
  affiliation: string;
  page?: number;
  size?: number;
  search?: string;
}

export interface GetTransactionParams {
  affiliation: string;
  year: number;
  month: number;
}

const getProceedings = (params: GetContentParams): Promise<GetProceedingResData> =>
  apiClient.get({ url: '/admin/meetings', params });

const getProceedingDetail = (proceedingId: number): Promise<GetProceedingDetailResData> =>
  apiClient.get({ url: `/admin/meetings/${proceedingId}` });

const getRules = (params: GetContentParams): Promise<GetRuleResData> =>
  apiClient.get({ url: '/admin/rule', params });

const getRuleDetail = (ruleId: number): Promise<GetRuleDetailResData> =>
  apiClient.get({ url: `/admin/rule/${ruleId}` });

const getTransactions = (params: GetTransactionParams): Promise<GetTransactionResData[]> =>
  apiClient.get({ url: '/admin/transactions', params });

export default {
  getProceedings,
  getProceedingDetail,
  getRules,
  getRuleDetail,
  getTransactions,
};
