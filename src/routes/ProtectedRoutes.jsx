import { useContext, useEffect, useState } from 'react';
import jwt from "jsonwebtoken";
import { AuthContext } from '../context/AuthContext';
const ProtectedRoutes = ({children}) => {

    // //const [loading, setLoading] = useState(false)
    // const { logoutHandler, isLoggedIn, token } = useContext(AuthContext);
    // useEffect(() => {
    //     if (token) {
    //         getRole()
    //     }
    // }, [token])

    // const getRole = () => {
    //    // const {user}= jwt.
    //    console.log(jwt.verify(token));
       
    // }

    return (
        <>{children}</>
    );
};
export default ProtectedRoutes;