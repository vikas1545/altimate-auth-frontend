import { createContext, useState } from "react";


export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const loginInfo =JSON.parse(localStorage.getItem('loginInfo')) || null;
    const [token, setToken] = useState(loginInfo?.token || '');
    const [refreshToken, setRefreshToken] = useState(loginInfo?.refreshToken || '');
    const [isLoggedIn, setIsLoaggedIn] = useState(loginInfo?.isLoggedIn || false);

    const logoutHandler = () => {
        setToken('')
        setRefreshToken('')
        setIsLoaggedIn(false)
    }

    const loginHandler = (tokenArr) => {
        setToken(tokenArr[0] || '')
        setRefreshToken(tokenArr[1] || '')
        setIsLoaggedIn(true)
    }



    return (
        <AuthContext.Provider value={{ token, refreshToken, isLoggedIn, loginHandler, logoutHandler }}>
            {children}
        </AuthContext.Provider>
    )
}