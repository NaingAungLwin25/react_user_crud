import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Checkbox, Select } from 'antd';
import { getUserById, updateUser } from './requestHelper';
import './editUser.css';

const { Option } = Select;

const EditUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state; // Get user ID from navigation state
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  const fetchUser = async (id) => {
    try {
      const userData = await getUserById(id);
      setUser(userData);
      form.setFieldsValue(userData);
    } catch (error) {
      message.error('Failed to fetch user data.');
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateUser(userId,{ ...user, ...values });
      message.success('User details updated successfully.');
      navigate('/userDetail');
    } catch (error) {
      message.error('Failed to update user details.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-user-container">
      <Form
        form={form}
        initialValues={user}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
          <Input  />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="age" label="Age" rules={[{ required: true, message: 'Please input the age!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="regions" label="Region" rules={[{ required: true, message: 'Please input the region!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please input the phone number!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="isGraduated" label="Graduated" valuePropName="checked">
          <Checkbox />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please select the gender!' }]}>
          <Select>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditUser;
