import { Button, Checkbox, Input, message } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import { Upload } from '@/components/upload';
import { usePathname } from '@/router/hooks';
import editStore from '@/store/editStore';

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

  useEffect(() => {
    if (data) {
      setInputValue(data.title);
      // 파일은 추후 추가해야 함 (현재는 정적 asset 사용 중)
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
    console.log('Title:', inputValue);
    console.log('File List:', fileList);
    console.log('Public:', isPublic);

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
