// 임시 (transaction 제외 ) => 예전에 쓰던 코드

export interface MockDataType {
  key: React.Key;
  id: string;
  title: string;
  upload_date: string;
  content: string;
  edit_date: string;
  public?: boolean;
  file?: string;
}

// 임시 => 예전에 쓰던 코드랑 합치기 위함
export type DataType = MockDataType | ProceedingContent | RuleContent;

// 여기서부터 실제로 필요한 타입들

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

interface ListFileInfo {
  fileName: string;
  url: string;
  createAt: string;
  updateAt: string;
  id: number;
  fileType: string;
}

export interface ProceedingContent {
  createAt: string;
  updateAt: string;
  id: number;
  title: string;
  content: string;
  affiliationId: number;
  files?: ListFileInfo[];
}

export interface GetProceedingResData {
  totalPages: number;
  totalElements: number;
  size: number;
  content: ProceedingContent[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface RuleContent {
  createAt: string;
  updateAt: string;
  id: number;
  title: string;
  content: string;
  affiliationId: number;
  files: ListFileInfo[];
}

export interface GetRuleResData {
  totalPages: number;
  totalElements: number;
  size: number;
  content: RuleContent[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}
