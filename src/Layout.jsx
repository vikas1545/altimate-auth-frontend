import { Outlet } from 'react-router';
import React from 'react';
import CustomNav from './components/CustomNav';

const Layout = () => {
    return (
        <div>
            <CustomNav />
            <Outlet />
        </div>
    );
};

export default Layout;