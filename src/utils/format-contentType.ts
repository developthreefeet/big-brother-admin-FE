import { PostType } from '@/api/types';

export const formatContentType = (newData: PostType) => {
  const requestName = Object.keys(newData).find(
    (key): key is Exclude<keyof PostType, 'file'> => key !== 'file',
  );
  const requestData = requestName ? newData[requestName] : {};
  const fileInput = newData.file;

  const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';

  const body =
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="${requestName}"\r\n` +
    `Content-Type: application/json\r\n\r\n` +
    `${JSON.stringify(requestData)}\r\n`;

  const bodyParts: Array<Blob | string> = [body];

  if (fileInput && fileInput[0]) {
    bodyParts.push(
      `--${boundary}\r\n` +
        `Content-Disposition: form-data; name="file"; filename="${fileInput[0].name}"\r\n` +
        `Content-Type: ${fileInput[0].type}\r\n\r\n`,
    );

    bodyParts.push(fileInput[0]);
    bodyParts.push(`\r\n`);
  }

  bodyParts.push(`--${boundary}--\r\n`);

  const blob = new Blob(bodyParts, { type: `multipart/form-data; boundary=${boundary}` });

  return { data: blob, boundary };
};
