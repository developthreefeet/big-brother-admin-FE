export interface DataType {
  key: React.Key;
  title: string;
  upload_date: string;
}

export interface ListTableProps {
  data: DataType[];
  title: string;
  route: string;
}
