import React from 'react';
import { Image, Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Img from '../IMAGES';

const { Header } = Layout;
const AppHeader = () => {
    const navigate = useNavigate();
    const handleClick = (e) => {
        console.log('Clicked menu item:', e.key);
        // Add navigation logic here
        navigate(`/${e.key}`)
    };

    const menuItems = [
        { label: 'Home', key: 'home' },
        { label: 'About', key: 'about' },
        {
            label: 'Profile',
            key: 'profile',
            icon: <UserOutlined />,
            children: [
                { label: 'Login', key: 'login' },
                { label: 'Logout', key: 'logout' },
            ],
        },
    ];

    return (
        <Layout>
            <Header style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div><Image src={Img.logo} alt='logo' height={62} preview={false} /></div>
                <Menu
                    onClick={handleClick}
                    theme="dark"
                    mode="horizontal"
                    // defaultSelectedKeys={['home']}
                    items={menuItems}
                    style={{ flex: 1, justifyContent: 'flex-end', display: 'flex' }}
                />
            </Header>
        </Layout>
    );
};

export default AppHeader;
