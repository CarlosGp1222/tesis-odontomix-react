import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Sidebar () {

    return (
        <div className="min-h-screen flex">
          {/* Menú Lateral */}
          <div className="bg-gray-300 w-64 space-y-6 py-7 px-5 border-r-4 border-indigo-300 bg-slate-800 text-white">
            <Link href="/" className="text-xl font-semibold text-cyan-600 border-b-2 border-cyan-600 pb-2"><img src="../img/odontomixSinFondo.png" alt="Logotipo menu" /></Link>
            <ul>
              <li><Link href="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white">Inicio</Link></li>
              <li><Link href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white">Acerca de</Link></li>
              <li><Link href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white">Servicios</Link></li>
              <li><Link href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white">Contacto</Link></li>
            </ul>
          </div>
    
          {/* Contenido principal */}
          <div className="flex-1 bg-gray-200">
            {/* Aquí irá el contenido principal de tu aplicación */}
          </div>
        </div>
      );
}

