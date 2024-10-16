import { DetailDataType } from '@/api/types';
import { formatToISOStringDate } from '@/lib/utils';

import CommonBackToListButton from '../back-to-list-button/CommonBackToListButton';
import IconBackToListButton from '../back-to-list-button/IconBackToListButton';

import PdfViewer from './PdfViewer';

function FileDetail({ data }: { data: DetailDataType }) {
  // const pathname = usePathname();
  return (
    <div className="flex flex-col space-y-5 p-10">
      <IconBackToListButton />
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{data.title}</h2>
        {/* {pathname.includes('proceeding') && !data.public && <EditButton />} */}
      </div>
      <p>
        <strong>게시일</strong> {formatToISOStringDate(data.createAt)}
      </p>
      <hr />
      <PdfViewer pdf={data.fileInfo[0].url} />
      <div className="flex justify-end pt-10">
        <CommonBackToListButton />
      </div>
    </div>
  );
}

export default FileDetail;
