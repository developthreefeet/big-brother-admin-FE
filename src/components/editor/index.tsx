/* eslint-disable import/order */
import '@/utils/highlight';
import ReactQuill, { ReactQuillProps } from 'react-quill-new';
import { useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';
import { StyledEditor } from './styles';

export default function Editor({ ...other }: ReactQuillProps) {
  const token = useThemeToken();
  const { themeMode } = useSettings();

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['bold', 'italic', 'underline', 'strike'],
      ],
    },
  };

  return (
    <StyledEditor $token={token} $thememode={themeMode}>
      <ReactQuill {...other} modules={modules} placeholder="새 글을 작성하세요..." />
    </StyledEditor>
  );
}
