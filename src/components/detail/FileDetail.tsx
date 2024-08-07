import CommonBackToListButton from '../back-to-list-button/CommonBackToListButton';
import IconBackToListButton from '../back-to-list-button/IconBackToListButton';
import EditButton from '../edit-button';
import { DataType } from '../list-table/types';
import Preference from '../preference';

import PdfViewer from './PdfViewer';

function FileDetail({ data }: { data: DataType }) {
  return (
    <div className="flex flex-col space-y-5 p-10">
      <IconBackToListButton />
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{data.title}</h2>
        {!data.public && <EditButton />}
      </div>
      <p>
        <strong>게시일</strong> {data.upload_date}
      </p>
      <hr />
      <PdfViewer pdf="/static/test.pdf" />
      <Preference />
      <div className="flex justify-end pt-10">
        <CommonBackToListButton />
      </div>
    </div>
  );
}

export default FileDetail;
