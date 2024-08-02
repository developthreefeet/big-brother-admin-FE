import { Button, Card } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import { USER_LIST } from '@/_mock/assets';
import { IconButton, Iconify } from '@/components/icon';
import ProTag from '@/theme/antd/components/tag';
import { useThemeToken } from '@/theme/hooks';

import AddUserModal from './add-user-modal';
import DeleteUserModal from './delete-user-modal';

import type { Role, UserInfo } from '#/entity';

const USERS: UserInfo[] = USER_LIST;

export default function RolePage() {
  const { colorTextSecondary } = useThemeToken();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const columns: ColumnsType<UserInfo> = [
    {
      title: '이름',
      dataIndex: 'name',
      width: 300,
      render: (_, record) => {
        return (
          <div className="flex">
            <div className="ml-2 flex flex-col">
              <span className="text-sm">{record.username}</span>
              <span style={{ color: colorTextSecondary }} className="text-xs">
                {record.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: '역할',
      dataIndex: 'role',
      align: 'center',
      width: 120,
      render: (role: Role) => <ProTag color="cyan">{role.name}</ProTag>,
    },
    {
      title: '',
      key: 'operation',
      align: 'center',
      width: 100,
      render: () => (
        <div className="flex w-full justify-center text-gray">
          <IconButton onClick={() => setIsDeleteModalOpen(true)}>
            <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
          </IconButton>
          <DeleteUserModal isModalOpen={isDeleteModalOpen} setIsModalOpen={setIsDeleteModalOpen} />
        </div>
      ),
    },
  ];

  return (
    <Card
      title="사용자 목록"
      extra={
        <>
          <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
            추가하기
          </Button>
          <AddUserModal isModalOpen={isAddModalOpen} setIsModalOpen={setIsAddModalOpen} />
        </>
      }
    >
      <Table
        rowKey="id"
        size="small"
        scroll={{ x: 'max-content' }}
        pagination={false}
        columns={columns}
        dataSource={USERS}
      />
    </Card>
  );
}
