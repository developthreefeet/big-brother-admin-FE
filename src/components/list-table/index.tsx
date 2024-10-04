import { Divider, Table, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePathname } from '@/router/hooks';
import { useSettings } from '@/store/settingStore';
import { returnPathname } from '@/utils/return-pathname';

import { DataType, ListTableProps } from './types';

import { ThemeMode } from '#/enum';
import type { TableColumnsType } from 'antd';

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    title: record.title,
  }),
};

function ListTable({ data, route, title }: ListTableProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [tableData, setTableData] = useState<DataType[]>(data);

  const navigate = useNavigate();

  const { themeMode } = useSettings();

  const pathname = usePathname();
  const isProceedingUploadPage = pathname.includes('proceeding');

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const columns: TableColumnsType<DataType> = [
    {
      title: '제목',
      dataIndex: 'title',
      render: (text: string, record: DataType) => {
        const baseUrl = returnPathname();
        const recordUrl = `${baseUrl}/${record.id}`;

        return (
          <a
            href={recordUrl}
            style={{
              color: themeMode === ThemeMode.Light ? 'black' : 'white',
              textDecoration: 'none',
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: '게시일',
      dataIndex: 'createAt',
      render: (value: string) => {
        const date = new Date(value);
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate;
      },
    },
    ...(isProceedingUploadPage
      ? [
          {
            title: '공개여부',
            dataIndex: 'public',
            render: (value: boolean) => (value ? '공개' : '비공개'),
          },
        ]
      : []),
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDelete = () => {
    const newData = tableData.filter((item) => !selectedRowKeys.includes(item.id));
    setTableData(newData);
    setSelectedRowKeys([]);
  };

  const rowSelectionWithDelete = {
    ...rowSelection,
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const showDelete = !['회의록 목록', '입/출금 내역 목록', '학칙/회칙 목록'].includes(title);

  return (
    <div className="flex flex-col space-y-5 pt-10">
      <h1 className="mb-5 text-2xl font-bold">{title}</h1>
      <div className="flex justify-between">
        {showDelete && (
          <Button onClick={handleDelete} disabled={selectedRowKeys.length === 0} className="w-24">
            선택 삭제
          </Button>
        )}
        <Button onClick={() => navigate(route)}>새 글 업로드</Button>
      </div>
      <Divider />
      <Table
        rowSelection={showDelete ? { type: 'checkbox', ...rowSelectionWithDelete } : undefined}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
}

export default ListTable;
