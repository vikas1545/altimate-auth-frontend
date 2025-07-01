import React, { useContext, useState } from 'react';
import { Image, Layout, Menu, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Img from '../IMAGES';
import { requests } from '../pages/agent';
import { AuthContext } from '../context/AuthContext';

const { Header } = Layout;
const AppHeader = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const {logoutHandler,isLoggedIn,token}=useContext(AuthContext);

    console.log('isLoggedIn main :',isLoggedIn)
    console.log('token main :',token)
    const handleLogout = async () => {
        try {
            const res = await requests.post('logout', {});
            console.log('res logout :', res)
            if (!res.error) {
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
