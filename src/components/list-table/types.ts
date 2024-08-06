// 임시 (transaction 제외)
export interface DataType {
  key: React.Key;
  id: string;
  title: string;
  upload_date: string;
  content?: string;
  edit_date?: string;
}

export interface TransactionDataType {
  trans_id: number;
  corporate_number: string;
  bank_account_number: string;
  trans_direction: string;
  deposit: string;
  withdraw: string;
  balance: string;
  trans_date: string;
  trans: string;
}

export interface ListTableProps {
  data: DataType[];
  title: string;
  route: string;
}
