// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Checkbox, Select } from 'antd';
import { createUser } from './requestHelper';
import './register.css';

const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await createUser(values);
      message.success('User added successfully.');
      navigate('/userDetail');
    } catch (error) {
      message.error('Failed to add user.');
    }
  };

  return (
    <div className="register-container">
      <Form
        name="register"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'The input is not valid E-mail!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password/>
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[{ required: true, message: 'Please input your age!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="regions"
          label="Region"
          rules={[{ required: true, message: 'Please input your region!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="isGraduated"
          label="Graduated"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select your gender!' }]}
        >
          <Select>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Change
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
