

import { Button, Card, Flex, Form, Image, Input, notification, Radio, Select, Switch, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import Img from '../../IMAGES';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { requests } from '../agent';

function UserProfile() {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();

    const getData = async () => {
        try {
            setLoading(true)
            const res = await requests.get('user');
            const phone = res.data?.phone.replace('+91', '') || null
            form.setFieldsValue({ ...res.data, phone })
            setUserDetails(res.data)

        } catch (error) {
            notification.error({ message: 'Something is wrong' })
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        getData()
    }, [])

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

            <Card hoverable style={{ width: 600, cursor: 'default' }} loading={loading}>
                <Button
                    style={{ float: 'right' }}
                    type="primary"
                    onClick={() => navigate('/all-users', { state: 'user' })}
                >
                    All Users
                </Button>
                <Meta title="User Details" />
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
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email!' }]}
                    >
                        <Input placeholder='example@gmail.com' />
                    </Form.Item>

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please enter your username!' }]}
                    >
                        <Input placeholder='username' readOnly />
                    </Form.Item>

                    <Form.Item
                        label="Phone No"
                        name="phone"
                        rules={[{
                            required: true, message: 'Please input your phone No!',
                            // message: 'Phone number must be exactly 10 digits',
                        }]}
                    >
                        <Input prefix='+91' placeholder="Phone Number" minLength={10} maxLength={10} />
                    </Form.Item>



                    <Flex justify='space-between' wrap gap={2}>
                        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                            <Select
                                placeholder="Select role"
                                allowClear
                                style={{ minWidth: '200px' }}
                            >
                                <Select.Option key='user' value="user">User</Select.Option>
                                <Select.Option key='admin' value="admin" disabled={userDetails?.role !== 'admin'}>Admin</Select.Option>
                            </Select>
                        </Form.Item>


                        <Form.Item
                            name="email_verified"
                            label="Email Verified"
                            rules={[{ required: true, }]}
                            initialValue={false}
                        >
                            <Radio.Group>
                                <Radio key='yes' value={true}>Yes</Radio>
                                <Radio key='no' value={false}>No</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            name="phone_verified"
                            label="Phone Verified"
                            rules={[{ required: true, }]}
                            initialValue={false}
                        >
                            <Radio.Group>
                                <Radio key='yes' value={true}>Yes</Radio>
                                <Radio key='no' value={false}>No</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Flex>



                    <Form.Item>
                        <Button type="link" htmlType="button" role='link' danger style={{ float: 'right' }} 
                        onClick={()=>navigate('/reset-password',{state:userDetails?.email})}>
                            Change Password
                        </Button>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </Card>

        </div>
    )
}

export default UserProfile;