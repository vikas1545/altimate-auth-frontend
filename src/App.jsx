
import './App.css'
import { Button } from 'antd';
import PageRoutes from './routes/PageRoutes';
import { AuthProvider } from './context/AuthContext';
function App() {

  return (
    <AuthProvider>
      <PageRoutes />
    </AuthProvider>
  )
}

export default App
