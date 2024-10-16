import { Button, Checkbox, Input, message, notification } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import { DetailDataType } from '@/api/types';
import { Upload } from '@/components/upload';
import { usePathname } from '@/router/hooks';
import editStore from '@/store/editStore';
import { usePostRule } from '@/store/ruleStore';

interface UploadFileComponentProps {
  title: string;
  data?: DetailDataType;
}

function UploadFileComponent({ title, data }: UploadFileComponentProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const pathname = usePathname();
  const isProceedingUploadPage = pathname.includes('proceeding');

  const { isEditing, stopEditing } = editStore();
  const { mutate: addRule } = usePostRule();

  const today = new Date();
  const year = today.getFullYear();
  const month = `0${today.getMonth() + 1}`.slice(-2);
  const day = `0${today.getDate()}`.slice(-2);

  useEffect(() => {
    if (data) {
      setInputValue(data.title);
      // 파일 리스트 초기화 코드가 필요하면 여기에 추가할 수 있음
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
    const ruleData = {
      title: inputValue,
      affiliationId: 10,
    };

    const formData = new FormData();
    formData.append(
      `${getRequestName()}RegisterRequest`,
      new Blob([JSON.stringify(ruleData)], { type: 'application/json' }),
    );

    // 선택한 파일이 있으면 업로드 (File로 변환)
    if (fileList[0].originFileObj) {
      formData.append('file', fileList[0].originFileObj as File);
    }

    if (isProceedingUploadPage) {
      // 진행 관련 로직 추가
    } else {
      addRule(formData);
    }

    notification.success({ message: '업로드가 완료되었습니다.' });
    setInputValue('');
    setFileList([]);
    setIsPublic(false);

    if (isEditing) {
      stopEditing();
    }
  };

  const getRequestName = () => {
    if (pathname.includes('proceeding')) return 'proceeding';
    if (pathname.includes('rule')) return 'rule';
    if (pathname.includes('transaction')) return 'transaction';
    return '';
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
