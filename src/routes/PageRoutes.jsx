import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import HomePage from '../pages/HomePage';
import Unauthorize from '../pages/Unathorize';
import PageNotFound from '../pages/PageNotFound';
import LoginPage from '../pages/auth/LoginPage';
import AuthLayout from '../pages/auth/AuthLayout';
import RegisterPage from '../pages/auth/RegisterPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import VerifyEmailPage from '../pages/auth/VerifyEmailPage';
import ForgetPassword from '../pages/auth/ForgetPasswordPage';
import UserProfile from '../pages/auth/UserProfile';
import AllUsersProfile from '../pages/auth/AdminProfile';


function PageRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/forget-password' element={<ForgetPassword />} />
                <Route element={<Layout />}>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/about' element={<h1>About</h1>} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='/reset-password' element={<ResetPasswordPage />} />
                    <Route path='/verify-otp' element={<VerifyEmailPage />} />
                    <Route path='/user-profile' element={<UserProfile />} />
                    <Route path='/all-Users' element={<AllUsersProfile />} />
                </Route>
                {/* Page Not Found */}
                <Route path="unauthorize" element={<Unauthorize />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default PageRoutes