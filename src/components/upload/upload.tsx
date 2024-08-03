import { Typography, Upload as AntdUpload } from 'antd';
import { ItemRender } from 'antd/es/upload/interface';

import { useThemeToken } from '@/theme/hooks';

import { StyledUpload } from './styles';
import UploadIllustration from './upload-illustration';
import UploadListItem from './upload-list-item';

import type { UploadProps } from 'antd';

const { Dragger } = AntdUpload;
const { Text, Title } = Typography;

interface Props extends UploadProps {
  thumbnail?: boolean;
}

const itemRender: (thumbnail: boolean) => ItemRender = (thumbnail) => {
  return function temp() {
    // eslint-disable-next-line prefer-rest-params
    const [, file, , actions] = arguments;

    const isPdf = file.type === 'application/pdf';

    // Render UploadListItem only if the file is a PDF
    if (!isPdf) {
      return null;
    }

    return <UploadListItem file={file} actions={actions} thumbnail={thumbnail} />;
  };
};
export function Upload({ thumbnail = false, ...other }: Props) {
  const { colorPrimary } = useThemeToken();

  return (
    <StyledUpload $thumbnail={thumbnail}>
      <Dragger {...other} itemRender={itemRender(thumbnail)} accept=".pdf">
        <div className="opacity-100 hover:opacity-80">
          <p className="m-auto max-w-[200px]">
            <UploadIllustration />
          </p>
          <Typography>
            <Title level={5} className="mt-4">
              파일을 드래그하거나 이곳을 클릭하세요.
            </Title>
            <Text type="secondary">
              파일을 드래그하거나,
              <Text style={{ color: colorPrimary }} className="mx-2" underline>
                컴퓨터에서
              </Text>
              선택하세요.
            </Text>
          </Typography>
        </div>
      </Dragger>
    </StyledUpload>
  );
}
