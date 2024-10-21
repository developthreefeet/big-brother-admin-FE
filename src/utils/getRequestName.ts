import { RequestName } from '@/api/types';

export const getRequestName = (pathname: string): RequestName => {
  if (pathname.includes('notice')) return 'notice';
  if (pathname.includes('event')) return 'event';
  if (pathname.includes('faq')) return 'faq';
  if (pathname.includes('rule')) return 'rule';
  if (pathname.includes('proceeding')) return 'proceeding';
  if (pathname.includes('transaction')) return 'transaction';
  if (pathname.includes('user')) return 'user';
  return '';
};
