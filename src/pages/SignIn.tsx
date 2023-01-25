import { Button, Form, Input } from 'antd';
import { FormLayout } from 'antd/es/form/Form';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/User/UserContext';
import { login } from '../services/auth';

export default function SignIn() {
  const navigate = useNavigate();
  const { logginginUser } = useContext(UserContext);
  const [form] = Form.useForm<{ email: string, password: string }>();
  const formLayout = 'vertical' as FormLayout;
  
  const onFinish = (values: { email: string, password: string }) => {
    login(values).then((response) => {
      logginginUser(response.data.token);
      navigate('/profile');
    });
  };

  return (
    <Form
      layout={formLayout}
      form={form}
      initialValues={{ layout: formLayout }}
      onFinish={onFinish}
    >
      <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please fill your email' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please fill your password' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType='submit'>Submit</Button>
      </Form.Item>
    </Form>
  );
};
