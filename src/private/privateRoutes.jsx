import { Outlet, Navigate } from 'react-router-dom'

export const Private = () => {
    const token = localStorage.getItem('token')
    console.log(token,'token')
    const data = token === null ? false : true
    return data ? (
        <Outlet />
    ) : <Navigate to={'/login'} />
}