import { Button } from 'antd';

import editStore from '@/store/editStore';

function EditButton() {
  const { toggleEditing } = editStore();
  return <Button onClick={toggleEditing}>수정하기</Button>;
}

export default EditButton;
