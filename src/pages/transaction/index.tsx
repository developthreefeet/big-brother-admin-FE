import ListTable from '@/components/list-table';
import { TransactionDataType } from '@/components/list-table/types';

export const transactionData: TransactionDataType[] = [
  {
    trans_id: 1,
    corporate_number: '1234567890',
    bank_account_number: '9876543210',
    trans_direction: 'deposit',
    deposit: '5000',
    withdraw: '0',
    balance: '10000',
    trans_date: '2024-08-06T10:00:00Z',
  },
  {
    trans_id: 2,
    corporate_number: '1234567890',
    bank_account_number: '9876543210',
    trans_direction: 'withdraw',
    deposit: '0',
    withdraw: '2000',
    balance: '8000',
    trans_date: '2024-08-06T11:00:00Z',
  },
  {
    trans_id: 3,
    corporate_number: '1234567890',
    bank_account_number: '9876543210',
    trans_direction: 'deposit',
    deposit: '3000',
    withdraw: '0',
    balance: '11000',
    trans_date: '2024-08-06T12:00:00Z',
  },
];

function Transaction() {
  return <ListTable data={transactionData} route="/transaction/upload" title="입/출금 내역 목록" />;
}

export default Transaction;
