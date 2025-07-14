

import { Button, Card, Flex, Form, Image, Input, notification } from 'antd';
import Meta from 'antd/es/card/Meta';
import Img from '../../IMAGES';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { requests } from '../agent';
import { AuthContext } from '../../context/AuthContext';

function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParam] = useSearchParams();
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { logoutHandler, token: storedToken } = useContext(AuthContext);
  const location = useLocation();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      form.setFields([{ name: 'confirmPassword', errors: ['Password and Confirm Password mismatching !'] }])
      return
    }
    values['confirmPassword'] = values['password'];
    delete values['confirmPassword'];

    try {
      setLoading(true)
      values.token = location.state ? storedToken : searchParam.get('token');
      const userEmail = location.state;
      const res = userEmail ? await requests.post('/change-password', { password: values.password })
        : await requests.post('/reset-password', { ...values })
      if (!res.error) {
        notification.success({ message: res.message })
        logoutHandler()
        navigate('/login')
      }
    } catch (error) {
      notification.error({ message: 'Failed to update password' })
    } finally {
      setLoading(false)
    }

  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        padding: 10
      }}
    >

      <Card
        hoverable
        style={{ width: 600, cursor: 'default' }}
        loading={loading}
      >
        <Meta title="Reset Password" description="Altimate Authentication" />
        <Flex justify='center'><Image src={Img.logo} alt='logo' height={62} preview={false} /></Flex>

        <Form
          name="basic"
          layout="vertical"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600, width: '100%' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          {/* <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder='example@gmail.com' />
          </Form.Item> */}

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='Password' />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please input your confirm password!' }]}
          >
            <Input.Password placeholder='Confirm Password' />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>

      </Card>

    </div>
  )
}

export default ResetPasswordPage