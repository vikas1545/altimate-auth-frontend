

import { Button, Card, Flex, Form, Image, Input, notification, Radio, Select, Space, Table, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import Img from '../../IMAGES';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { requests } from '../agent';

function AllUsersProfile() {
    const navigate = useNavigate()
    const location = useLocation();
    const role = location.state?.role

    const [userDetails, setUserDetails] = useState([]);
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();


    const getUsers = async () => {
        try {
            setLoading(true)
            const res = await requests.get('users');
            setUserDetails(res.data)

        } catch (error) {
            notification.error({ message: 'Something is wrong' })
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        if (role === 'admin') {
            getUsers()
        } else {
            navigate('/unauthorize', { replace: true })
        }
    }, [])

    const onFinish = values => {
        console.log('Success:', values);
    };

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Email Verified',
            key: 'email_verified',
            dataIndex: 'email_verified',
            render: (_, { email_verified }) => {
                console.log('email_verified :', email_verified)
                let color = 'volcano';
                if (email_verified) {
                    color = 'green'
                }
                return (
                    <Tag color={color}>
                        {email_verified ? 'Yes' : 'No'}
                    </Tag>
                );

            }
        },
        {
            title: 'Phone Verified',
            key: 'phone_verified',
            dataIndex: 'phone_verified',
            render: (_, { phone_verified }) => {
                let color = 'volcano';
                if (phone_verified) {
                    color = 'green'
                }
                return (
                    <Tag color={color}>
                        {phone_verified ? 'Yes' : 'No'}
                    </Tag>
                );

            }
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Button >Edit</Button>
                    <Button danger>Delete</Button>
                </Space>
            ),
        },

    ]

    return (
        <div
            style={{
                minHeight: '90vh',
                display: 'flex',
                justifyContent: 'center',
                // alignItems: 'center',
                backgroundColor: 'lightblue',
                padding: 10
            }}
        >

            <Card hoverable style={{ width: 'auto', cursor: 'default', }} loading={loading}>
                <Table columns={columns} dataSource={userDetails} rowKey='_id' />
            </Card>

        </div>
    )
}

export default AllUsersProfile;