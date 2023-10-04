import {createBrowserRouter} from 'react-router-dom';
// importar layouts
import AuthLayout from './layouts/AuthLayout';
import Layout from './layouts/Layout';
import Inicio from './views/Inicio';
import Login from './views/Login';
import Crearcliente from './views/cliente/crear-cliente';
import Vistacliente from './views/cliente/vista-cliente';
import CrearPaciente from './views/paciente/crear-paciente';
import VistaPaciente from './views/paciente/vista-paciente';

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
            {
                path: '/crear-cliente',
                element: <Crearcliente />,
            },
            //Paciente
            {
                path: '/crear-paciente',
                element: <h1>Crear Paciente</h1>,
            }
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
            {
                path: '/cliente/crear-cliente',
                element: <Crearcliente />,
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
            {
                path: '/paciente/crear-paciente',
                element: <CrearPaciente />,
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