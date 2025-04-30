import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import HomePage from '../pages/HomePage';
import Unauthorize from '../pages/Unathorize';
import PageNotFound from '../pages/PageNotFound';
import LoginPage from '../pages/auth/LoginPage';

function PageRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/about' element={<LoginPage />} />
                </Route>


                {/* Page Not Found */}
                <Route path="unauthorize" element={<Unauthorize />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default PageRoutes