import { Select } from 'antd';
import { useState } from 'react';

import { TransactionDataType } from '@/components/list-table/types';
import { formatDate } from '@/utils/format-date';

const { Option } = Select;

const months = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

export const transactionData: { [month: string]: TransactionDataType[] } = {
  '8월': [
    {
      trans_id: 1,
      corporate_number: '1234567890',
      bank_account_number: '9876543210',
      trans_direction: 'deposit',
      deposit: '5000',
      withdraw: '0',
      balance: '10000',
      trans_date: '2024-01-15T10:00:00Z',
      trans: '커피숍',
    },
    {
      trans_id: 2,
      corporate_number: '1234567890',
      bank_account_number: '9876543210',
      trans_direction: 'withdraw',
      deposit: '0',
      withdraw: '1000',
      balance: '9000',
      trans_date: '2024-01-20T11:00:00Z',
      trans: '레스토랑',
    },
    {
      trans_id: 3,
      corporate_number: '1234567890',
      bank_account_number: '9876543210',
      trans_direction: 'deposit',
      deposit: '15000',
      withdraw: '0',
      balance: '24000',
      trans_date: '2024-01-25T09:00:00Z',
      trans: '급여',
    },
  ],
  '9월': [
    {
      trans_id: 4,
      corporate_number: '1234567890',
      bank_account_number: '9876543210',
      trans_direction: 'withdraw',
      deposit: '0',
      withdraw: '2000',
      balance: '22000',
      trans_date: '2024-02-05T10:00:00Z',
      trans: '온라인 쇼핑',
    },
    {
      trans_id: 5,
      corporate_number: '1234567890',
      bank_account_number: '9876543210',
      trans_direction: 'deposit',
      deposit: '1000',
      withdraw: '0',
      balance: '23000',
      trans_date: '2024-02-10T11:00:00Z',
      trans: '친구 송금',
    },
    {
      trans_id: 6,
      corporate_number: '1234567890',
      bank_account_number: '9876543210',
      trans_direction: 'withdraw',
      deposit: '0',
      withdraw: '500',
      balance: '22500',
      trans_date: '2024-02-15T14:00:00Z',
      trans: '버스 카드 충전',
    },
    {
      trans_id: 7,
      corporate_number: '1234567890',
      bank_account_number: '9876543210',
      trans_direction: 'deposit',
      deposit: '5000',
      withdraw: '0',
      balance: '27500',
      trans_date: '2024-02-20T09:00:00Z',
      trans: '보너스',
    },
  ],
  '10월': [
    {
      trans_id: 8,
      corporate_number: '1234567890',
      bank_account_number: '9876543210',
      trans_direction: 'deposit',
      deposit: '7000',
      withdraw: '0',
      balance: '34500',
      trans_date: '2024-03-01T10:00:00Z',
      trans: '부업 수익',
    },
    {
      trans_id: 9,
      corporate_number: '1234567890',
      bank_account_number: '9876543210',
      trans_direction: 'withdraw',
      deposit: '0',
      withdraw: '3000',
      balance: '31500',
      trans_date: '2024-03-05T12:00:00Z',
      trans: '외식',
    },
    {
      trans_id: 10,
      corporate_number: '1234567890',
      bank_account_number: '9876543210',
      trans_direction: 'withdraw',
      deposit: '0',
      withdraw: '1500',
      balance: '30000',
      trans_date: '2024-03-15T14:00:00Z',
      trans: '정기 구독',
    },
    {
      trans_id: 11,
      corporate_number: '1234567890',
      bank_account_number: '9876543210',
      trans_direction: 'deposit',
      deposit: '2500',
      withdraw: '0',
      balance: '32500',
      trans_date: '2024-03-20T09:00:00Z',
      trans: '상품 판매',
    },
    {
      trans_id: 12,
      corporate_number: '1234567890',
      bank_account_number: '9876543210',
      trans_direction: 'withdraw',
      deposit: '0',
      withdraw: '2000',
      balance: '30500',
      trans_date: '2024-03-25T11:00:00Z',
      trans: '의류 구매',
    },
  ],
};

function Transaction() {
  const [selectedMonth, setSelectedMonth] = useState<string>('January');

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };

  const calculateTotals = () => {
    let totalDeposit = 0;
    let totalWithdraw = 0;

    const data = transactionData[selectedMonth] || [];
    data.forEach((item) => {
      if (item.deposit) {
        totalDeposit += parseInt(item.deposit, 10);
      }
      if (item.withdraw) {
        totalWithdraw += parseInt(item.withdraw, 10);
      }
    });

    return { totalDeposit, totalWithdraw };
  };

  const currentMonthData = transactionData[selectedMonth] || [];

  return (
    <div className="flex flex-col space-y-8 p-10">
      <div className="flex flex-col space-y-1 pt-10">
        <h1 className="mb-5 text-2xl font-bold">입/출금 내역</h1>
        <Select defaultValue="8월" style={{ width: 200 }} onChange={handleMonthChange}>
          {months.map((month) => (
            <Option key={month} value={month}>
              {month}
            </Option>
          ))}
        </Select>
      </div>
      <div className="flex flex-col justify-center space-y-2">
        <p className="text-lg font-semibold">총 입/출금 내역</p>
        <p className="text-lg">- {calculateTotals().totalWithdraw.toLocaleString()}원</p>
        <p className="text-lg">+ {calculateTotals().totalDeposit.toLocaleString()}원</p>
      </div>
      <div>
        {currentMonthData.map((item, index) => (
          <div key={index} className="border-b px-0 py-4 ">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
                <p className="text-blue-500 text-lg font-bold">
                  {item.trans_direction === 'deposit'
                    ? `+ ${Number(item.deposit).toLocaleString()}`
                    : `- ${Number(item.withdraw).toLocaleString()}`}
                </p>
                <div className="text-md flex space-x-1">
                  <p>{item.trans_direction === 'deposit' ? '입금' : '출금'}</p>
                  <p>| {item.trans}</p>
                </div>
                <span className="text-[1rem] font-semibold">
                  잔액: <span>{Number(item.balance).toLocaleString()}</span>
                </span>
              </div>
              <p className="text-md">{formatDate(item.trans_date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transaction;
