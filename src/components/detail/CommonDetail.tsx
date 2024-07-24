import { Button } from 'antd';

import { DataType } from '../list-table/types';
import Preference from '../preference';

function CommonDetail({ data }: { data: DataType }) {
  return (
    <div className="flex flex-col space-y-5 p-10">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{data.title}</h2>
        <Button>수정하기</Button>
      </div>
      <div className="flex space-x-5">
        <p>
          <strong>게시일</strong> {data.upload_date}
        </p>
        <p>
          <strong>수정일</strong> {data.edit_date}
        </p>
      </div>
      <div className="rounded-sm border-2 border-gray-200 p-8">
        <p>{data.content}</p>
      </div>
      <Preference />
    </div>
  );
}

export default CommonDetail;
