import { Button, Input, notification } from 'antd';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import { CommonDetailType, CommonRegisterRequest, EventRegisterRequest } from '@/api/types';
import { usePathname } from '@/router/hooks';
import editStore from '@/store/editStore';
import { usePostNotice } from '@/store/noticeStore';

import Editor from '../editor';

interface UploadContentProps {
  title: string;
  data?: CommonDetailType;
}

function UploadContent({ title, data }: UploadContentProps) {
  const [editorValue, setEditorValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { isEditing, stopEditing } = editStore();

  const { mutate: addNotice } = usePostNotice();

  // const { addNotice, updateNotice } = useNoticeStore();
  // const { addEvent, updateEvent } = useEventStore();
  // const { addFaq, updateFaq } = useFaqStore();

  const pathname = usePathname();

  useEffect(() => {
    if (data) {
      setInputValue(data.title as string);
      setEditorValue(data.content as string);
    }
  }, [data]);

  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const isValid = inputValue.length > 0 && stripHtmlTags(editorValue).trim().length > 0;

  const getRequestName = () => {
    if (pathname.includes('notice')) return 'notice';
    if (pathname.includes('event')) return 'event';
    if (pathname.includes('faq')) return 'faq';
    return '';
  };

  const requestName = getRequestName();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    // if (isValid) {
    //   if (isEditing) {
    //     if (requestName==='notice') {
    //       updateNotice(data!.id!, {
    //         title: inputValue,
    //         content: editorValue,
    //         edit_date: dateString,
    //       });
    //     }
    //     if (requestName==='event') {
    //       updateEvent(data!.id!, {
    //         title: inputValue,
    //         content: editorValue,
    //         edit_date: dateString,
    //       });
    //     }
    //     if (requestName==='faq') {
    //       updateFaq(data!.id!, {
    //         title: inputValue,
    //         content: editorValue,
    //         edit_date: dateString,
    //       });
    //     }
    //     stopEditing();
    //     notification.success({
    //       message: '수정 완료',
    //       description: '성공적으로 수정되었습니다.',
    //     });
    //   } else {
    // const newData: PostType = {
    //   noticeRegisterRequest: {
    //     title: inputValue,
    //     content: editorValue,
    //     affiliationId: 1, // 현재 총학으로 되어있음 수정필요
    //   },
    //   file: [],
    // };

    let newData: CommonRegisterRequest | EventRegisterRequest;

    if (requestName === 'event') {
      newData = {
        title: inputValue,
        content: editorValue,
        target: '',
        startDateTime: '',
        endDateTime: '',
        affiliationId: 1,
      } as EventRegisterRequest;
    } else {
      newData = {
        title: inputValue,
        content: editorValue,
        affiliationId: 1,
      } as CommonRegisterRequest;
    }

    const formData = new FormData();
    formData.append(
      `${requestName}RegisterRequest`,
      new Blob([JSON.stringify(newData)], { type: 'application/json' }),
    );

    if (selectedFile) {
      // 선택한 파일이 있으면 업로드
      formData.append('file', selectedFile);
    }

    if (requestName === 'notice') addNotice(formData);
    // if (requestName === 'notice') addNotice(formData);
    // if (requestName==='event') addEvent(newData as Event);
    // if (requestName==='faq') addFaq(newData as FAQ);

    notification.success({
      message: '업로드 완료',
      description: '성공적으로 업로드되었습니다.',
    });
    setInputValue('');
    setEditorValue('');
  };
  // }

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
          placeholder="제목을 입력해주세요."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          maxLength={50}
          showCount
        />
        <input type="file" onChange={handleFileChange} />
        <Editor value={editorValue} onChange={setEditorValue} />
      </div>
      <Button className="mx-auto w-52" disabled={!isValid} onClick={handleButtonClick}>
        {isEditing ? '수정 완료' : '작성 완료'}
      </Button>
    </div>
  );
}

export default UploadContent;
