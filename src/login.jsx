import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { getUsers } from './requestHelper';
import { useAuth } from './AuthContext';

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    try {
      const users = await getUsers();
      const user = users.find(
        user => user.email === values.useremail && user.password === values.password
      );
      if (user) {
        login();
        navigate('/userDetail');
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      console.error('Failed to fetch user data:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        {error && <div className="error-message">{error}</div>}
        <Form.Item
          name="useremail"
          rules={[
            {
              required: true,
              message: 'Please input your Useremail!',
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Useremail" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
