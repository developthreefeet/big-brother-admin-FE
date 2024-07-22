import { Form, Input, Modal } from 'antd';

interface UserManagementModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  variant: 'add' | 'delete';
}

function UserManagementModal({ isModalOpen, setIsModalOpen, variant }: UserManagementModalProps) {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={`${variant}` === 'add' ? '사용자 추가' : '사용자 삭제'}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={`${variant}` === 'add' ? '추가하기' : '삭제하기'}
      cancelText="취소"
    >
      <div className=" my-10 ">
        <Form
          name="basic"
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          {variant === 'add' && (
            <>
              <Form.Item
                label="사용자 이름"
                name="name"
                rules={[{ required: true, message: '이름을 넣어주세요!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="사용자 이메일"
                name="email"
                rules={[{ required: true, message: '이메일을 넣어주세요!' }]}
              >
                <Input />
              </Form.Item>
            </>
          )}

          <Form.Item
            label="관리자 비밀번호"
            name="password"
            rules={[{ required: true, message: '관리자 비밀번호를 넣어주세요!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default UserManagementModal;
