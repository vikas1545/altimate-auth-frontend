import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Layout from '../../Layout';

const AuthLayout = () => {

  //const [loading, setLoading] = useState(false)
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
      {/* {isLoggedIn ? <Outlet /> : <h1>You need to logged in</h1>} */}
      {isLoggedIn ? <Layout /> : <h1>You need to logged in</h1>}
    </div>
  );
};
export default AuthLayout;