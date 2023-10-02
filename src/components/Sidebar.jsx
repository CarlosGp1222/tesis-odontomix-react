import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen flex">
            {/* Menú Lateral */}
            <div className="bg-indigo-900 text-white w-64 space-y-6 py-7 px-5">
                <a href="/" className="text-2xl font-semibold"><img src="../img/LogoDiente.png" alt="logotipo" /></a>
                <ul>
                    <li><a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">Inicio</a></li>
                    <li><a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">Acerca de</a></li>
                    <li><a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">Servicios</a></li>
                    <li><a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">Contacto</a></li>
                </ul>
            </div>

            {/* Contenido principal */}
            <div className="flex-1 bg-gray-200">
                {/* Aquí irá el contenido principal de tu aplicación */}
            </div>
        </div>
    );
}

export default Sidebar;
