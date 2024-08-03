import { Button, Form, Input, message } from 'antd';
import { useState, useEffect } from 'react';

import { Upload } from '@/components/upload';

function UploadFile({ title }: { title: string }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const beforeUpload = (file: File) => {
    const isPdf = file.type === 'application/pdf';
    if (!isPdf) {
      message.error('PDF 파일만 업로드할 수 있습니다.');
    }
    return isPdf;
  };

  const handleChange = ({ fileList }: any) => setFileList(fileList);

  useEffect(() => {
    const values = form.getFieldsValue();
    setIsButtonDisabled(!(values.title && fileList.length > 0));
  }, [fileList, form]);

  return (
    <div className="flex flex-col space-y-5 pt-10">
      <h1 className="mb-5 text-2xl font-bold">{title}</h1>
      <Form
        form={form}
        onValuesChange={() => {
          const values = form.getFieldsValue();
          setIsButtonDisabled(!(values.title && fileList.length > 0));
        }}
      >
        <Form.Item
          name="title"
          label="제목"
          rules={[{ required: true, message: '제목을 입력해주세요.' }]}
        >
          <Input placeholder="제목을 입력해주세요." />
        </Form.Item>
        <Form.Item
          label="파일 업로드"
          rules={[{ required: true, message: '파일을 업로드해주세요.' }]}
        >
          <Upload
            maxCount={1}
            name="single"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            fileList={fileList}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="mx-auto w-52" disabled={isButtonDisabled}>
            작성 완료
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadFile;
