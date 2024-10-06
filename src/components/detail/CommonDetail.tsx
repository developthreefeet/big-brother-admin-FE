import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { CommonDetailType } from '@/api/types';
import { formatToISOStringDate } from '@/lib/utils';

import CommonBackToListButton from '../back-to-list-button/CommonBackToListButton';
import IconBackToListButton from '../back-to-list-button/IconBackToListButton';
import EditButton from '../edit-button';

function CommonDetail({ data }: { data: CommonDetailType }) {
  return (
    <div className="flex flex-col space-y-5 p-10">
      <IconBackToListButton />
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{data.title}</h2>
        <EditButton />
      </div>
      <div className="flex space-x-5">
        <p>
          <strong>게시일</strong> {formatToISOStringDate(data.createAt)}
        </p>
        <p>
          <strong>수정일</strong> {formatToISOStringDate(data.updateAt)}
        </p>
      </div>
      <div className="rounded-sm border-2 border-gray-200 p-8">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{data.content}</ReactMarkdown>
      </div>
      <div className="flex justify-end pt-10">
        <CommonBackToListButton />
      </div>
    </div>
  );
}

export default CommonDetail;
