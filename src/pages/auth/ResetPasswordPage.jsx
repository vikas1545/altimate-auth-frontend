

import { Button, Card, Flex, Form, Image, Input, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import Img from '../../IMAGES';
import { Link, useNavigate } from 'react-router-dom';

function ResetPasswordPage() {

  const onFinish = values => {
    console.log('Success:', values);
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
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder='example@gmail.com' />
          </Form.Item>

          {/* <Form.Item
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
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
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

export default ResetPasswordPage