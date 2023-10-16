import {createBrowserRouter} from 'react-router-dom';
// importar layouts
import AuthLayout from './layouts/AuthLayout';
import Layout from './layouts/Layout';
import Inicio from './views/Inicio';
import Login from './views/Login';
import Vistacliente from './views/cliente/vista-cliente';
import VistaPaciente from './views/paciente/vista-paciente';
import VistaCitas from './views/citas/vista-citas';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Inicio />,
            },
            
            {
                path: '/listar-cliente',
                element: <Vistacliente />,
            },
        ],
    },
    // Clientes
    {
        path: '/cliente',
        element: <Layout />,
        children: [            
            {
                path: '/cliente/vista-cliente',
                element: <Vistacliente />,
            },
        ],
    },
    {
        path: '/paciente',
        element: <Layout />,
        children: [            
            {
                path: '/paciente/vista-paciente',
                element: <VistaPaciente />,
            },
        ],
    },
    // Citas
    {
        path: '/citas',
        element: <Layout />,
        children: [
            {
                path: '/citas/vista-citas',
                element: <VistaCitas />,
            },
        ],
    },
    // Auth
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