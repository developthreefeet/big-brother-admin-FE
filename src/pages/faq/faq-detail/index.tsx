import CommonDetail from '@/components/detail/CommonDetail';
import { DataType } from '@/components/list-table/types';

const index = () => {
  const data: DataType = {
    key: '1',
    id: '32',
    title: 'FAQ제목',
    upload_date: '2024/07/23',
    edit_date: '2024/07/24',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eius consequuntur, autem illum adipisci saepe, dicta nobis maxime neque animi velit unde. Totam reprehenderit nobis ipsa consequatur! Quibusdam, quasi hic?',
  };

  return <CommonDetail data={data} />;
};

export default index;
