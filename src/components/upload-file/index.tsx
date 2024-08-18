import { Button, Checkbox, Input, message, notification } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import { Upload } from '@/components/upload';
import { usePathname } from '@/router/hooks';
import editStore from '@/store/editStore';
import { useProceedingStore } from '@/store/proceedingStore'; // Make sure to adjust the import path
import { useRuleStore } from '@/store/ruleStore'; // Make sure to adjust the import path

import { DataType } from '../list-table/types';

interface UploadFileComponentProps {
  title: string;
  data?: DataType;
}

function UploadFileComponent({ title, data }: UploadFileComponentProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const pathname = usePathname();
  const isProceedingUploadPage = pathname.includes('proceeding');

  const { isEditing, stopEditing } = editStore();
  const { addProceeding, updateProceeding } = useProceedingStore();
  const { addRule, updateRule } = useRuleStore();

  useEffect(() => {
    if (data) {
      setInputValue(data.title);
      // Update file list if data.file is not empty
      if (data.file) {
        setFileList([{ uid: '0', name: 'uploaded-file.pdf', status: 'done', url: data.file }]);
      }
      setIsPublic(data.public || false);
    }
  }, [data]);

  useEffect(() => {
    setIsButtonDisabled(!(inputValue && fileList.length > 0));
  }, [inputValue, fileList]);

  const beforeUpload = (file: File) => {
    const isPdf = file.type === 'application/pdf';
    if (!isPdf) {
      message.error('PDF 파일만 업로드할 수 있습니다.');
    }
    return isPdf;
  };

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => setFileList(fileList);

  const handleSubmit = () => {
    const fileUrl = '/static/test.pdf'; // Update file URL as per the requirement

    // Data to be used for both add and update
    const proceedingData = {
      key: new Date().getTime().toString(), // Unique key
      id: data ? data.id : new Date().getTime().toString(), // Use existing ID if editing
      title: inputValue,
      upload_date: new Date().toISOString().split('T')[0],
      edit_date: new Date().toISOString().split('T')[0],
      content: '',
      file: fileUrl,
      public: isPublic,
    };

    if (isEditing) {
      if (isProceedingUploadPage) {
        updateProceeding(data?.id as string, proceedingData); // Use the data ID if editing
      } else {
        updateRule(data?.id as string, proceedingData); // Use the data ID if editing
      }
      notification.success({ message: '수정이 완료되었습니다.' });
    } else if (isProceedingUploadPage) {
      addProceeding(proceedingData);
      notification.success({ message: '업로드가 완료되었습니다.' });
    } else {
      addRule(proceedingData);
      notification.success({ message: '업로드가 완료되었습니다.' });
    }

    // Clear input values
    setInputValue('');
    setFileList([]);
    setIsPublic(false);

    if (isEditing) {
      stopEditing();
    }
  };

  return (
    <div className="flex flex-col space-y-5 p-10">
      {isEditing && (
        <Button type="text" className="w-20" onClick={stopEditing} icon={<IoIosArrowBack />}>
          뒤로가기
        </Button>
      )}
      <h1 className="mb-5 text-2xl font-bold">{title}</h1>
      <div className="flex flex-col space-y-5">
        <Input
          maxLength={50}
          showCount
          placeholder="제목을 입력해주세요."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {isProceedingUploadPage && (
          <Checkbox checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)}>
            공개
          </Checkbox>
        )}
        <Upload
          maxCount={1}
          name="single"
          beforeUpload={beforeUpload}
          onChange={handleFileChange}
          fileList={fileList}
        />
      </div>
      <div className="flex justify-center">
        <Button type="primary" className="w-52" disabled={isButtonDisabled} onClick={handleSubmit}>
          {isEditing ? '수정 완료' : '작성 완료'}
        </Button>
      </div>
    </div>
  );
}

export default UploadFileComponent;
