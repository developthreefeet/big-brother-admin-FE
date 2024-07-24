import { Button } from 'antd';

import { returnPathname } from '@/utils/return-pathname';

function CommonBackToListButton() {
  const baseUrl = returnPathname();

  return (
    <Button className="w-40">
      <a href={`${baseUrl}/management`}>목록으로 돌아가기</a>
    </Button>
  );
}

export default CommonBackToListButton;
