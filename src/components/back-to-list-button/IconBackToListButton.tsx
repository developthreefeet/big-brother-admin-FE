import { Button } from 'antd';
import { IoIosArrowBack } from 'react-icons/io';

import { returnPathname } from '@/utils/return-pathname';

function IconBackToListButton() {
  const baseUrl = returnPathname();
  return (
    <Button type="text" icon={<IoIosArrowBack />} className="w-20">
      <a href={`${baseUrl}/management`}>목록으로</a>
    </Button>
  );
}

export default IconBackToListButton;
