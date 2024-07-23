import { Button, Card, Input, message } from 'antd';

import { Upload } from '@/components/upload';

function UploadFile({ title }: { title: string }) {
  const beforeUpload = (file: File) => {
    const isPdf = file.type === 'application/pdf';
    if (!isPdf) {
      message.error('PDF 파일만 업로드할 수 있습니다.');
    }
    return isPdf;
  };

  return (
    <div className="flex flex-col space-y-5 pt-10">
      <h1 className="mb-5 text-2xl font-bold">{title}</h1>
      <Input placeholder="제목을 입력해주세요." />
      <Card title="파일 업로드" className="w-full">
        <Upload maxCount={1} name="single" beforeUpload={beforeUpload} />
      </Card>
      <Button className="mx-auto w-52">작성 완료</Button>
    </div>
  );
}

export default UploadFile;
