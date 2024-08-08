import { Carousel } from 'antd';
import React from 'react';

import { TransactionDataType } from '@/components/list-table/types';
import { formatDate } from '@/utils/format-date';

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
    trans: '할리스커피',
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
    trans: 'pc방',
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
    trans: '집가고싶다',
  },
];

function Transaction() {
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

  const currentMonthIndex = new Date().getMonth();

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#4d51543e',
    width: '140px',
    padding: '10px',
    borderRadius: '10px',
  };

  const contentStyle: React.CSSProperties = {
    margin: 0,
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bolder',
  };

  const calculateTotals = () => {
    let totalDeposit = 0;
    let totalWithdraw = 0;

    transactionData.forEach((item) => {
      if (item.deposit) {
        totalDeposit += parseInt(item.deposit, 10);
      }
      if (item.withdraw) {
        totalWithdraw += parseInt(item.withdraw, 10);
      }
    });

    return { totalDeposit, totalWithdraw };
  };

  return (
    <div className="flex flex-col space-y-8 p-10">
      <div className="flex flex-col space-y-1 pt-10">
        <h1 className="mb-5 text-2xl font-bold">입/출금 내역</h1>
        <div className="max-w-md">
          <Carousel arrows infinite={false} style={containerStyle} dots={false}>
            {months.slice(0, currentMonthIndex + 1).map((month, index) => (
              <div style={containerStyle} key={index}>
                <p style={contentStyle}>{month}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="flex flex-col justify-center space-y-2">
        <p className="text-lg font-semibold">총 입/출금 내역</p>
        <p className="text-lg">- {calculateTotals().totalWithdraw.toLocaleString()}원</p>
        <p className="text-lg">+ {calculateTotals().totalDeposit.toLocaleString()}원</p>
      </div>
      <div>
        {transactionData.map((item, index) => (
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
