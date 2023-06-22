import { Suspense, lazy } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Private } from './private/privateRoutes';
const Register = lazy(() => import('./compenents/register/Register'))
const Login = lazy(() => import('./compenents/login/Login'))
const Get = lazy(() => import('./compenents/get/Get'))
const View = lazy(() => import('./view/view'))
function App() {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path='/' element={<Navigate to={'/login'} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route element={<Private />}>
            <Route path='/get' element={<Get />} />
            <Route path='/view/:id' element={<View />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
