import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, notification, DatePicker, Upload } from 'antd';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import { CommonDetailType, CommonRegisterRequest, EventRegisterRequest } from '@/api/types';
import { usePathname } from '@/router/hooks';
import editStore from '@/store/editStore';
import { usePostEvent } from '@/store/eventStore';
import { usePostFAQ } from '@/store/faqStore';
import { usePostNotice } from '@/store/noticeStore';
import { returnPathname } from '@/utils/return-pathname';

import Editor from '../editor';

interface UploadContentProps {
  title: string;
  data?: CommonDetailType;
}

type RangeValue = [Dayjs | null, Dayjs | null] | null;

function UploadContent({ title, data }: UploadContentProps) {
  const [editorValue, setEditorValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [dateRange, setDateRange] = useState<RangeValue | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);

  const { isEditing, stopEditing } = editStore();

  const { mutate: addNotice } = usePostNotice();
  const { mutate: addEvent } = usePostEvent();
  const { mutate: addFaq } = usePostFAQ();

  // const { addNotice, updateNotice } = useNoticeStore();
  // const { addEvent, updateEvent } = useEventStore();
  // const { addFaq, updateFaq } = useFaqStore();

  const pathname = usePathname();
  const { RangePicker } = DatePicker;

  useEffect(() => {
    if (data) {
      setInputValue(data.title as string);
      setEditorValue(data.content as string);
    }
  }, [data]);

  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const getRequestName = () => {
    if (pathname.includes('notice')) return 'notice';
    if (pathname.includes('event')) return 'event';
    if (pathname.includes('faq')) return 'faq';
    return '';
  };

  const requestName = getRequestName();

  const isValid =
    inputValue.length > 0 &&
    stripHtmlTags(editorValue).trim().length > 0 &&
    (requestName === 'event' ? targetValue.length > 0 && dateRange : true);

  const handleRangePickerChange = (date: RangeValue | null) => {
    setDateRange(date);
  };

  const handleButtonClick = () => {
    // if (isValid) {
    //   if (isEditing) {
    //     if (requestName==='notice') {
    //       updateNotice(data!.id!, {
    //         title: inputValue,
    //         content: editorValue,
    //         edit_date: dateString,
    //       });
    //     }
    //     if (requestName==='event') {
    //       updateEvent(data!.id!, {
    //         title: inputValue,
    //         content: editorValue,
    //         edit_date: dateString,
    //       });
    //     }
    //     if (requestName==='faq') {
    //       updateFaq(data!.id!, {
    //         title: inputValue,
    //         content: editorValue,
    //         edit_date: dateString,
    //       });
    //     }
    //     stopEditing();
    //     notification.success({
    //       message: '수정 완료',
    //       description: '성공적으로 수정되었습니다.',
    //     });
    //   } else {
    // const newData: PostType = {
    //   noticeRegisterRequest: {
    //     title: inputValue,
    //     content: editorValue,
    //     affiliationId: 1, // 현재 총학으로 되어있음 수정필요
    //   },
    //   file: [],
    // };

    let newData: CommonRegisterRequest | EventRegisterRequest;

    if (requestName === 'event') {
      newData = {
        title: inputValue,
        content: editorValue,
        target: targetValue,
        startDateTime: dateRange?.[0]?.format('YYYY-MM-DDTHH:mm:ss'),
        endDateTime: dateRange?.[1]?.format('YYYY-MM-DDTHH:mm:ss'),
        affiliationId: 1,
      } as EventRegisterRequest;
    } else {
      newData = {
        title: inputValue,
        content: editorValue,
        affiliationId: 1,
      } as CommonRegisterRequest;
    }

    const formData = new FormData();
    console.log(newData);
    formData.append(
      `${requestName}RegisterRequest`,
      new Blob([JSON.stringify(newData)], { type: 'application/json' }),
    );

    if (fileList.length > 0) {
      // 선택한 파일이 있으면 업로드
      fileList.forEach((file) => {
        formData.append('file', file.originFileObj);
      });
    }

    if (requestName === 'notice') addNotice(formData);
    if (requestName === 'event') addEvent(formData);
    if (requestName === 'faq') addFaq(formData);

    notification.success({
      message: '업로드 완료',
      description: '성공적으로 업로드되었습니다.',
    });
    setInputValue('');
    setEditorValue('');
    setFileList([]);
    setDateRange(null);
    setTargetValue('');
    const baseUrl = returnPathname();
    const recordUrl = `${baseUrl}/management`;
    window.location.href = recordUrl;
  };
  // }

  return (
    <div className="flex flex-col space-y-5 p-10">
      {isEditing && (
        <Button type="text" className="w-20" onClick={stopEditing} icon={<IoIosArrowBack />}>
          뒤로가기
        </Button>
      )}
      <h1 className="mb-5 text-2xl font-bold">{title}</h1>
      <div className="flex flex-col space-y-5">
        <Input
          placeholder="제목을 입력해주세요."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          maxLength={50}
          showCount
        />
        <Upload
          multiple
          beforeUpload={() => false}
          fileList={fileList}
          onChange={(info: any) => {
            setFileList(info.fileList);
          }}
          onRemove={(file: any) => {
            setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
          }}
        >
          <Button icon={<UploadOutlined />}>파일 선택</Button>
        </Upload>
        {requestName === 'event' && (
          <>
            <RangePicker showTime value={dateRange} onChange={handleRangePickerChange} />
            <Input
              placeholder="대상을 입력해주세요."
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
            />
          </>
        )}
        <Editor value={editorValue} onChange={setEditorValue} />
      </div>
      <Button className="mx-auto w-52" disabled={!isValid} onClick={handleButtonClick}>
        {isEditing ? '수정 완료' : '작성 완료'}
      </Button>
    </div>
  );
}

export default UploadContent;
