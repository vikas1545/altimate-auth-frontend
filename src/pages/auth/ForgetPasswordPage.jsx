import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Card, Flex, Form, Image, Input, notification, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import Img from '../../IMAGES';
import { requests } from '../agent';

function ForgetPassword() {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    // if (values.password !== values.confirmPassword) {
    //   form.setFields([{ name: 'confirmPassword', errors: ['Password and Confirm Password mismatching !'] }])
    //   return
    // }
    // values['confirmPassword'] = values['password'];
    // delete values['password'];

    try {
      setLoading(true)
      const res = await requests.post('/forget-password', { ...values })
      console.log('res for pass :',res)
      if(!res.error){
        notification.success({message:res.message})
      }
    } catch (error) {
      notification.error({ message: 'Failed to send reset password link' })
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
        <Meta title="Forget Password" description="Altimate Authentication" />
        <Flex justify='center'><Image src={Img.logo} alt='logo' height={62} preview={false} /></Flex>

        <Form
          layout="vertical"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600, width: '100%' }}
          onFinish={onFinish}
          form={form}
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


      </Card>
    </div>
  )
}

export default ForgetPassword