export interface DataType {
  key: React.Key;
  id: string;
  title: string;
  upload_date: string;
  content?: string;
  edit_date?: string;
}

export interface ListTableProps {
  data: DataType[];
  title: string;
  route: string;
}
