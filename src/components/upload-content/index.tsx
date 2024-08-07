import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import editStore from '@/store/editStore';

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

  useEffect(() => {
    if (data) {
      setInputValue(data.title);
      setEditorValue(data.content as string);
    }
  }, [data]);

  useEffect(() => {
    console.log(editorValue);
    console.log(inputValue);
  }, [editorValue, inputValue]);

  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const isValid = inputValue.length > 0 && stripHtmlTags(editorValue).trim().length > 0;

  const handleButtonClick = () => {
    if (isValid) {
      console.log('Title:', inputValue);
      console.log('Content:', editorValue);
      if (isEditing) {
        // 수정 api
        stopEditing();
      } // else upload api
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
