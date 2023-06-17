import { Suspense, lazy } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
const Register = lazy(() => import('./compenents/register/Register'))
const Login = lazy(() => import('./compenents/login/Login'))
const Get = lazy(() => import('./compenents/get/Get'))
function App() {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path='/' element={<Navigate to={'/register'} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/get' element={<Get />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
