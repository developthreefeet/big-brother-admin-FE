import { DataType } from '../list-table/types';
import Preference from '../preference';

import PdfViewer from './PdfViewer';

function FileDetail({ data }: { data: DataType }) {
  return (
    <div className="flex flex-col space-y-5 p-10">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{data.title}</h2>
      </div>

      <p>
        <strong>게시일</strong> {data.upload_date}
      </p>
      <hr />
      <PdfViewer pdf="/static/test.pdf" />
      <Preference />
    </div>
  );
}

export default FileDetail;
