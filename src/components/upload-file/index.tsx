import { Button, Form, Input, message } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { useState, useEffect } from 'react';

import { Upload } from '@/components/upload';

function UploadFileComponent({ title }: { title: string }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const beforeUpload = (file: File) => {
    const isPdf = file.type === 'application/pdf';
    if (!isPdf) {
      message.error('PDF 파일만 업로드할 수 있습니다.');
    }
    return isPdf;
  };

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => setFileList(fileList);

  const handleSubmit = () => {
    // 업로드 api자리
    const values = form.getFieldsValue();
    console.log('Title:', values.title);
    console.log('File List:', fileList);
  };

  useEffect(() => {
    const values = form.getFieldsValue();
    setIsButtonDisabled(!(values.title && fileList.length > 0));
  }, [fileList, form]);

  return (
    <div className="flex flex-col pt-10">
      <h1 className="mb-5 text-2xl font-bold">{title}</h1>
      <Form
        form={form}
        onValuesChange={() => {
          const values = form.getFieldsValue();
          setIsButtonDisabled(!(values.title && fileList.length > 0));
        }}
      >
        <Form.Item name="title">
          <Input placeholder="제목을 입력해주세요." />
        </Form.Item>
        <Form.Item name="file">
          <Upload
            maxCount={1}
            name="single"
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
            fileList={fileList}
          />
        </Form.Item>
      </Form>
      <div className="flex justify-center">
        <Button type="primary" className="w-52" disabled={isButtonDisabled} onClick={handleSubmit}>
          작성 완료
        </Button>
      </div>
    </div>
  );
}

export default UploadFileComponent;
