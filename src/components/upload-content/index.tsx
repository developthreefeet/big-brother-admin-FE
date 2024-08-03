import { Button, Input } from 'antd';
import { useState } from 'react';

import Editor from '../editor';

function UploadContent({ title }: { title: string }) {
  const [editorValue, setEditorValue] = useState('');

  return (
    <div className="flex flex-col space-y-5 pt-10">
      <h1 className="mb-5 text-2xl font-bold">{title}</h1>
      <div className="flex flex-col space-y-5">
        <Input placeholder="제목을 입력해주세요." />
        <Editor sample value={editorValue} onChange={setEditorValue} />
      </div>
      <Button className="mx-auto w-52">작성 완료</Button>
    </div>
  );
}

export default UploadContent;
