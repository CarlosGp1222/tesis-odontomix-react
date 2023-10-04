import { Outlet } from "react-router-dom"
import { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // Importando íconos de Font Awesome
import { Link } from 'react-router-dom';
export default function Layout() {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menuName) => {
    if (activeMenu === menuName) {
      setActiveMenu(null);  // Si el menú ya está activo, lo cerramos.
    } else {
      setActiveMenu(menuName);  // Si no, abrimos el menú seleccionado.
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Menú Lateral */}
      <div className="bg-gray-300 w-64 space-y-6 py-7 px-5 border-r-4 bg-slate-800 text-white">
        <Link to="/" className="text-xl font-semibold text-cyan-600 border-b-2 border-cyan-600 pb-2">
          <img src="../img/odontomixSinFondo.png" alt="Logotipo menu" />
        </Link>
        <ul>
          <li className="" >
            <button onClick={() => handleMenuClick('crear')} className="block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white">Cliente</button>
            {activeMenu === 'crear' && (
              <ul className="ml-5 space-y-2 mt-2">
                <li><Link to="/cliente/vista-cliente" className="block py-2 px-4 rounded transition duration-200 hover:bg-indigo-500 hover:text-white">Lista de clientes</Link></li>
                <li><Link to="/paciente/vista-paciente" className="block py-2 px-4 rounded transition duration-200 hover:bg-indigo-500 hover:text-white">Lista de paciente</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white">Acerca de</Link></li>
          <li>
            <button className="block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white">Servicios</button>
            
          </li>
          <li><Link to="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white">Contacto</Link></li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 bg-gray-200">
      <Outlet />
      </div>
    </div>
  );
  // return (
  //   <div className="flex bg-gray-200">
  //     <Sidebar />
  //     <Outlet />
  //   </div>
  // )
}
