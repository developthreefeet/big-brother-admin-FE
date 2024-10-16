import apiClient from '../apiClient';
import {
  GetProceedingResData,
  GetProceedingDetailResData,
  GetRuleResData,
  GetRuleDetailResData,
  GetTransactionResData,
  GetFAQResData,
  GetFAQDetailResData,
  GetNoticeResData,
  GetNoticeDetailResData,
  GetEventResData,
  GetEventDetailResData,
  PostRes,
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

const getFAQs = (params: GetContentParams): Promise<GetFAQResData> =>
  apiClient.get({ url: '/admin/faq', params });

const getFAQDetail = (faqId: number): Promise<GetFAQDetailResData> =>
  apiClient.get({ url: `/admin/faq/${faqId}` });

const postFAQ = (newFAQ: FormData): Promise<PostRes> =>
  apiClient.post({
    url: '/admin/faq',
    data: newFAQ,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const getNotices = (params: GetContentParams): Promise<GetNoticeResData> =>
  apiClient.get({ url: '/admin/notice', params });

const getNoticeDetail = (noticeId: number): Promise<GetNoticeDetailResData> =>
  apiClient.get({ url: `/admin/notice/${noticeId}` });

const postNotice = (newNotice: FormData): Promise<PostRes> =>
  apiClient.post({
    url: '/admin/notice',
    data: newNotice,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const getEvents = (params: GetContentParams): Promise<GetEventResData> =>
  apiClient.get({ url: '/admin/event', params });

const getEventDetail = (eventId: number): Promise<GetEventDetailResData> =>
  apiClient.get({ url: `/admin/event/${eventId}` });

const postEvent = (newEvent: FormData): Promise<PostRes> =>
  apiClient.post({
    url: '/admin/event',
    data: newEvent,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export default {
  getProceedings,
  getProceedingDetail,
  getRules,
  getRuleDetail,
  getTransactions,
  getFAQs,
  getFAQDetail,
  getNotices,
  getNoticeDetail,
  getEvents,
  getEventDetail,
  postNotice,
  postEvent,
  postFAQ,
};
