import React, { useContext, useState } from 'react';
import { Avatar, Image, Layout, Menu, notification } from 'antd';
import { LoginOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Img from '../IMAGES';
import { requests } from '../pages/agent';
import { AuthContext } from '../context/AuthContext';

const { Header } = Layout;
const AppHeader = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { logoutHandler, isLoggedIn, token } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            const res = await requests.post('logout', {});
            if (!res.error) {
                logoutHandler()
                notification.success({ message: res.message || 'Logged out' })
            }

        } catch (error) {
            notification.error({ message: 'Failed to logged out' })
        }
        finally {
            setLoading(false)
        }
    }

    const handleClick = async (e) => {
        console.log('Clicked menu item:', e.key);
        // Add navigation logic here
        if (e.key === 'logout') {
            await handleLogout()
            return
        }
        navigate(`/${e.key}`)
    };

    const optsArr = [];
    if (isLoggedIn) {
        optsArr.push({ label: 'Logout', key: 'logout', icon: <Avatar style={{ backgroundColor: 'rgb(208 204 202)', }} icon={<LogoutOutlined />} /> })
        optsArr.push({ label: 'Profile', key: 'user-profile', icon: <Avatar style={{ backgroundColor: 'rgb(208 204 202)', }} icon={<ProfileOutlined />} /> })
    } else {
        optsArr.push({ label: 'Login', key: 'login', icon: <Avatar style={{ backgroundColor: 'rgb(208 204 202)', }} icon={<LoginOutlined />} /> })
    }

    const menuItems = [
        { label: 'Home', key: 'home' },
        { label: 'About', key: 'about' },
        {
            label: '',
            key: 'avtar',
            icon: <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }} size={50} icon={<UserOutlined />} />,
            children: optsArr
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
