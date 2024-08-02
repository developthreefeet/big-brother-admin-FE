import { Form, Input, message, Modal } from 'antd';
import React, { useState } from 'react';

interface AddUserModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddUserModal({ isModalOpen, setIsModalOpen }: AddUserModalProps) {
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

        // 성공 시 계정 새로 만들어주는 함수 추가 구현 필요 (현재는 user mock 데이터 사용중)
        console.log(values);

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
    const fieldsError = form.getFieldsError(['name', 'email', 'userPassword']);
    const fieldsValue = form.getFieldsValue(['name', 'email', 'userPassword', 'adminPassword']);
    const hasErrors = fieldsError.some(({ errors }) => errors.length > 0);
    const allFieldsFilled = Object.values(fieldsValue).every((value) => value);

    setIsFormValid(!hasErrors && allFieldsFilled);
  };

  return (
    <Modal
      title="사용자 추가"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="추가하기"
      cancelText="취소"
      okButtonProps={{ disabled: !isFormValid }}
    >
      <div className="my-10">
        <Form
          form={form}
          name="basic"
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onValuesChange={handleFormChange}
        >
          <Form.Item
            label="사용자 이름"
            name="name"
            rules={[
              { required: true, message: '이름을 입력해주세요!' },
              {
                pattern: /^[가-힣]{2,15}$/,
                message: '이름은 한글 조합 2~15글자여야 합니다.',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="사용자 이메일"
            name="email"
            rules={[
              { required: true, message: '이메일을 입력해주세요!' },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@mju\.ac\.kr$/,
                message: '유효한 이메일 주소를 입력해주세요. (@mju.ac.kr)',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="사용자 비밀번호"
            name="userPassword"
            rules={[
              { required: true, message: '사용자 비밀번호를 입력해주세요!' },
              {
                pattern: /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                message: '비밀번호는 영어 소문자, 숫자, 특수문자를 포함해 8~20글자여야 합니다.',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

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

export default AddUserModal;
