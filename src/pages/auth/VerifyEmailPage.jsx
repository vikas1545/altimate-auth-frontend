import { Button, Card, Checkbox, Flex, Form, Image, Input, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import Img from '../../IMAGES';
function VerifyEmailPage() {

  const onFinish = values => {
    console.log('Success:', values);
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
        style={{ width: 295, cursor: 'default' }}
      >
        <Meta title="Email Verification" description="Altimate Authentication" />
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
            label="OTP"
            name="otp"
            rules={[{ required: true, message: '6 digit OTP is required' }]}
          >
            <Input.OTP size='6' />
            <Typography.Title level={5} type='secondary'>Introduce 6 digits otp you have received on email </Typography.Title>
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Verify
            </Button>
          </Form.Item>
        </Form>


      </Card>

    </div>
  );
}

export default VerifyEmailPage