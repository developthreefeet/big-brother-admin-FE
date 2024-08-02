import { Form, Input, message, Modal } from 'antd';
import { useState } from 'react';

interface DeleteUserModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DeleteUserModal({ isModalOpen, setIsModalOpen }: DeleteUserModalProps) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const { adminPassword } = values;
        if (adminPassword !== 'admin1234@') {
          // 현재 관리자 비밀번호 하드코딩
          // 로그인한 관리자의 비밀번호 가져오는 함수 추가 구현 필요
          message.error('관리자 비밀번호가 일치하지 않습니다.');
          return;
        }
        message.success('성공적으로 삭제되었습니다.'); // 성공 시 계정 삭제하는 함수 추가 구현 필요

        form.resetFields();
        setIsFormValid(false);
        setIsModalOpen(false);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleFormChange = () => {
    const isAdminPasswordFilled = form.getFieldValue('adminPassword') !== '';

    setIsFormValid(isAdminPasswordFilled);
  };

  return (
    <Modal
      title="사용자 삭제"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="삭제하기"
      cancelText="취소"
      okButtonProps={{ disabled: !isFormValid }}
    >
      <div className="my-10">
        <Form
          form={form}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onValuesChange={handleFormChange}
        >
          <Form.Item
            label="관리자 비밀번호"
            name="adminPassword"
            rules={[{ required: true, message: '관리자 비밀번호를 입력해주세요!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default DeleteUserModal;
