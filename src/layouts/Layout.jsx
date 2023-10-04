import { Outlet } from "react-router-dom"
import { useState } from 'react';
import Modal from 'react-modal'
import { Link } from 'react-router-dom';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Layout() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleMenuClick = (menuName) => {
    if (activeMenu === menuName) {
      setActiveMenu(null);  // Si el menú ya está activo, lo cerramos.
    } else {
      setActiveMenu(menuName);
      setActiveSubMenu(null);  // Si no, abrimos el menú seleccionado.
    }
  };
  const handleSubMenuClick = (menuName) => {
    if (activeMenu === menuName) {
      setActiveSubMenu(null);  // Si el menú ya está activo, lo cerramos.
    } else {
      console.log(menuName);
      setActiveSubMenu(menuName);  // Si no, abrimos el menú seleccionado.
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Menú Lateral */}
      <div className={`w-64 space-y-6 py-7 px-5 border-r-4 bg-slate-800 text-white`}>
        <Link to="/" className="text-xl font-semibold text-cyan-600 border-b-2 border-cyan-600 pb-2">
          <img src="../img/odontomixSinFondo.png" alt="Logotipo menu" />
        </Link>
        <ul>
          <li className={""}>
            <button onClick={() => handleMenuClick('crear')} className={`block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${activeMenu == 'crear' ? 'bg-cyan-600' : ''}`}>Cliente</button>
            {activeMenu === 'crear' && (
              <ul  className="ml-5 space-y-2 mt-2">
                <li onClick={() => handleSubMenuClick('vista-cliente')}><Link to="/cliente/vista-cliente" className={`block py-2 px-4 rounded transition duration-200 hover:bg-indigo-500 hover:text-white ${activeSubMenu == 'vista-cliente' ? 'bg-indigo-500' : ''}`}>Lista de clientes</Link></li>
                <li onClick={() => handleSubMenuClick('crear-paciente')}><Link to="/paciente/vista-paciente" className={`block py-2 px-4 rounded transition duration-200 hover:bg-indigo-500 hover:text-white ${activeSubMenu == 'crear-paciente' ? 'bg-indigo-500' : ''}`}>Lista de paciente</Link></li>      
              </ul>
            )}
          </li>
          <li><Link onClick={() => handleMenuClick('acerca')} to="#" className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${activeMenu == 'acerca' ? 'bg-cyan-600' : ''}`}>Acerca de</Link></li>
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
  )
}
