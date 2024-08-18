import { Button, Input, notification } from 'antd';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import editStore from '@/store/editStore';
import { Notice, useNoticeStore } from '@/store/noticeStore';

import Editor from '../editor';
import { DataType } from '../list-table/types';

interface UploadContentProps {
  title: string;
  data?: DataType;
}

function UploadContent({ title, data }: UploadContentProps) {
  const [editorValue, setEditorValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const { isEditing, stopEditing } = editStore();

  const { addNotice, updateNotice, notices } = useNoticeStore();

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

  const handleButtonClick = () => {
    if (isValid) {
      if (isEditing) {
        updateNotice(data!.id!, {
          title: inputValue,
          content: editorValue,
          edit_date: new Date().toISOString().split('T')[0],
        });
        stopEditing();
        notification.success({
          message: '수정 완료',
          description: '공지사항이 성공적으로 수정되었습니다.',
        });
      } else {
        const newNotice: DataType = {
          key: `${Date.now()}`,
          id: `${Date.now()}`,
          title: inputValue,
          upload_date: new Date().toISOString().split('T')[0],
          edit_date: new Date().toISOString().split('T')[0],
          content: editorValue,
        };
        addNotice(newNotice as Notice);
        notification.success({
          message: '업로드 완료',
          description: '공지사항이 성공적으로 업로드되었습니다.',
        });
        console.log(notices);
      }

      setInputValue('');
      setEditorValue('');
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
          placeholder="제목을 입력해주세요."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          maxLength={50}
          showCount
        />
        <Editor value={editorValue} onChange={setEditorValue} />
      </div>
      <Button className="mx-auto w-52" disabled={!isValid} onClick={handleButtonClick}>
        {isEditing ? '수정 완료' : '작성 완료'}
      </Button>
    </div>
  );
}

export default UploadContent;
