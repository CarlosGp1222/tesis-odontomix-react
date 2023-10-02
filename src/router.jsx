import {createBrowserRouter} from 'react-router-dom';
// importar layouts
import AuthLayout from './layouts/AuthLayout';
import Layout from './layouts/Layout';
import Inicio from './views/Inicio';
import Login from './views/Login';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Inicio />,
            }
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',        
                element: <Login />,
            }
        ]
    }
]);

export default router;