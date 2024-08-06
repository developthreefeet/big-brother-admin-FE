import { DataType } from '@/components/list-table/types';
import { usePathname } from '@/router/hooks';

const useDataMatch = (dataSource: DataType[]) => {
  const pathname = usePathname();
  const id = pathname.split('/')[2];
  const data = dataSource.find((v) => v.id === id);

  return data;
};

export default useDataMatch;
