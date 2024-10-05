import { Select } from 'antd';
import { useState } from 'react';

import { GetTransactionResData } from '@/components/list-table/types';
import { useGetTransaction } from '@/store/transactionStore';
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

const getCurrentDateInfo = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // Month is 0-indexed
  return { currentYear, currentMonth };
};

function Transaction() {
  const { currentYear, currentMonth } = getCurrentDateInfo();
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const affiliation = '단과대';

  const { data: transactionData, isLoading } = useGetTransaction(
    affiliation,
    currentYear,
    selectedMonth,
  );

  const handleMonthChange = (value: string) => {
    setSelectedMonth(parseInt(value, 10));
  };

  const calculateTotals = () => {
    let totalDeposit = 0;
    let totalWithdraw = 0;

    transactionData?.forEach((item: GetTransactionResData) => {
      if (item.amount > 0) {
        totalDeposit += item.amount;
      } else {
        totalWithdraw += Math.abs(item.amount);
      }
    });

    return { totalDeposit, totalWithdraw };
  };

  return (
    <div className="flex flex-col space-y-8 p-10">
      <div className="flex flex-col space-y-1 pt-10">
        <h1 className="mb-5 text-2xl font-bold">입/출금 내역</h1>
        <Select
          defaultValue={`${currentMonth}월`}
          style={{ width: 200 }}
          onChange={handleMonthChange}
          value={`${selectedMonth}`}
        >
          {months.map((month, index) => (
            <Option key={index + 1} value={String(index + 1)}>
              {month}
            </Option>
          ))}
        </Select>
      </div>
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        <div className="flex flex-col space-y-10">
          <div className="flex flex-col justify-center space-y-2">
            <p className="text-lg font-semibold">총 입/출금 내역</p>
            <p className="text-lg">- {calculateTotals().totalWithdraw.toLocaleString()}원</p>
            <p className="text-lg">+ {calculateTotals().totalDeposit.toLocaleString()}원</p>
          </div>
          <div>
            {transactionData?.map((item: GetTransactionResData, index: number) => (
              <div key={index} className="border-b px-0 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <p className="text-blue-500 text-lg font-bold">
                      {item.amount > 0
                        ? `+ ${Number(item.amount).toLocaleString()}`
                        : `- ${Math.abs(item.amount).toLocaleString()}`}
                    </p>
                    <div className="text-md flex space-x-1">
                      <p>{item.amount > 0 ? '입금' : '출금'}</p>
                      <p>| {item.description}</p>
                    </div>
                    <span className="text-[1rem] font-semibold">
                      잔액: <span>{Number(item.balance).toLocaleString()}</span>
                    </span>
                  </div>
                  <p className="text-md">{formatDate(item.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Transaction;
