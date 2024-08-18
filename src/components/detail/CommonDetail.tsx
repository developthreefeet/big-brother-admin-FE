import CommonBackToListButton from '../back-to-list-button/CommonBackToListButton';
import IconBackToListButton from '../back-to-list-button/IconBackToListButton';
import EditButton from '../edit-button';
import { DataType } from '../list-table/types';

function CommonDetail({ data }: { data: DataType }) {
  return (
    <div className="flex flex-col space-y-5 p-10">
      <IconBackToListButton />
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{data.title}</h2>
        <EditButton />
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
      <div className="flex justify-end pt-10">
        <CommonBackToListButton />
      </div>
    </div>
  );
}

export default CommonDetail;
