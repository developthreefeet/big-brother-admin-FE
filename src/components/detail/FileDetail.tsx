import { DetailDataType, GetProceedingDetailResData } from '@/api/types';
import { formatToISOStringDate } from '@/lib/utils';
import { usePathname } from '@/router/hooks';

import CommonBackToListButton from '../back-to-list-button/CommonBackToListButton';
import IconBackToListButton from '../back-to-list-button/IconBackToListButton';
import EditButton from '../edit-button';

import PdfViewer from './PdfViewer';

function FileDetail({ data }: { data: DetailDataType }) {
  const pathname = usePathname();

  const isProceedingDetail = (data: DetailDataType): data is GetProceedingDetailResData => {
    return (data as GetProceedingDetailResData).meetingsId !== undefined;
  };

  return (
    <div className="flex flex-col space-y-5 p-10">
      <IconBackToListButton />
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{data.title}</h2>
        {isProceedingDetail(data) && (
          <div className="flex flex-col items-end gap-2">
            <div>
              <strong>상태: </strong>
              <span>{data.public ? '공개' : '비공개'}</span>
            </div>
            {isProceedingDetail(data) && pathname.includes('proceeding') && !data.public && (
              <EditButton />
            )}
          </div>
        )}
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
