import { Button, Card, Flex, Form, Image, Input, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import Img from '../../IMAGES';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { requests } from '../agent';

function RegisterPage() {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    delete values["confirmPassword"];
    
    try {
      setLoading(true);
      const res = await requests.post('register', { ...values });
      console.log('res :', res);

    } catch (error) {
      console.log('error :', error);
    } finally {
      setLoading(false)
    }
  };

  const navigate = useNavigate()
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
        <Meta title="Register User" description="Altimate Authentication" />
        <Flex justify='center'><Image src={Img.logo} alt='logo' height={62} preview={false} /></Flex>

        <Form
          name="basic"
          layout="vertical"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600, width: '100%' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        // autoComplete="off"
        >
          <Form.Item
            label="User Name"
            name="username"
            rules={[{ required: true, message: 'Please enter username!' }]}
          >
            <Input placeholder='username' />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
            hasFeedback
          >
            <Input placeholder='example@gmail.com' />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
            hasFeedback
          >
            <Input.Password placeholder='Password' />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please enter your confirm password!' },

            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
            ]}
          >
            <Input.Password placeholder='Confirm Password' />
          </Form.Item>

          <Form.Item>
            <Button type="link" onClick={() => navigate('/forget-password')}>
              Forget Password
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Flex justify='center' gap={4}>
          <Typography.Title level={5} type='secondary'>Already have an account ? </Typography.Title>
          <Link to='/login'>Sign In</Link>
        </Flex>

      </Card>

    </div>
  )
}

export default RegisterPage