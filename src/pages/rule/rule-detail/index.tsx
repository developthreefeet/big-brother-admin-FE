import FileDetail from '@/components/detail/FileDetail';

const index = () => {
  const data = {
    key: '1',
    id: '32',
    title: '학칙/회칙 제목',
    upload_date: '2024/07/23',
  };
  return <FileDetail data={data} />;
};

export default index;
