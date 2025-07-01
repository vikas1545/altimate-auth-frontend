import { Button, Card, Checkbox, Flex, Form, Image, Input, notification, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import Img from '../../IMAGES';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { requests } from '../agent';
import { AuthContext } from '../../context/AuthContext';
function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const { loginHandler, isLoggedIn } = useContext(AuthContext);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await requests.post('login', { ...values });

      if (!res.error && res.data.length === 2) {
        const loginInfo = { token: res.data[0], refreshToken: res.data[1], isLoggedIn: true }
        localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
        notification.success({ message: res.message || 'Logged in Successfully' })
        loginHandler(res.data)
        navigate('/')
      }

    } catch (error) {
      notification.error({ message: 'Failed to logged in' })
    } finally {
      setLoading(false)
    }
  };

  console.log('isLoggedIn test :', isLoggedIn)
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
      >
        <Meta title="Login" description="Altimate Authentication" />
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
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input placeholder='example@gmail.com' />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            help="Password must be of at least 6 characters"
          >
            <Input.Password placeholder='Password' />
          </Form.Item>



          <Flex justify='space-between'>
            <Button type="link" onClick={() => navigate('/forget-password')}>
              Forget Password
            </Button>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Flex>


          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Flex justify='center' gap={4}>
          <Typography.Title level={5} type='secondary'>Don't have an account ? </Typography.Title>
          <Link to='/register'>Sign Up</Link>
        </Flex>

      </Card>

    </div>
  );
}

export default LoginPage;
