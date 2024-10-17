import { Button, Checkbox, Input, message, notification } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { useState, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import { DetailDataType } from '@/api/types';
import { Upload } from '@/components/upload';
import { usePathname } from '@/router/hooks';
import editStore from '@/store/editStore';
import { usePostRule } from '@/store/ruleStore';
import { usePostTransaction } from '@/store/transactionStore';

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

  const getRequestName = () => {
    if (pathname.includes('proceeding')) return 'proceeding';
    if (pathname.includes('rule')) return 'rule';
    if (pathname.includes('transaction')) return 'transaction';
    return '';
  };

  const requestPage = getRequestName();

  const { isEditing, stopEditing } = editStore();
  const { mutate: addRule } = usePostRule();
  const { mutate: addTransaction } = usePostTransaction();

  /*
  const today = new Date();
  const year = today.getFullYear();
  const month = `0${today.getMonth() + 1}`.slice(-2);
  const day = `0${today.getDate()}`.slice(-2); */

  // 나중에 수정 관련 useEffect임

  useEffect(() => {
    if (data && requestPage !== 'transaction') {
      setInputValue(data.title);
    }
  }, [data, requestPage]);

  useEffect(() => {
    console.log(requestPage);
  }, [requestPage]);

  useEffect(() => {
    if (requestPage !== 'transaction') {
      setIsButtonDisabled(!(inputValue && fileList.length > 0));
    } else {
      setIsButtonDisabled(fileList.length === 0);
    }
  }, [inputValue, fileList, requestPage]);

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
      affiliationId: 2,
    };

    const formData = new FormData();

    // 선택한 파일이 있으면 업로드 (File로 변환)
    if (fileList[0].originFileObj) {
      formData.append('file', fileList[0].originFileObj as File);
    }

    if (requestPage === 'proceeding') {
      // 진행 관련 로직 추가
    } else if (requestPage === 'rule') {
      formData.append(
        `${requestPage}RegisterRequest`,
        new Blob([JSON.stringify(ruleData)], { type: 'application/json' }),
      );
      addRule(formData);
    } else if (requestPage === 'transaction') {
      addTransaction({ affiliationId: 26, newTransaction: formData });
    }

    notification.success({ message: '업로드가 완료되었습니다.' });
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
        {requestPage !== 'transaction' && (
          <Input
            maxLength={50}
            showCount
            placeholder="제목을 입력해주세요."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}
        {requestPage === 'proceeding' && (
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
