import { useState } from 'react';
import { Link , useLocation} from 'react-router-dom';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
export default function Sidebar() {
  const location = useLocation();

  const isPathActive = (path) => {
    return location.pathname.includes(path);
  };

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
    <div className={`w-64 space-y-6 py-7 px-5 border-r-4 bg-slate-800 text-white`}>
      <Link to="/" className="text-xl font-semibold text-cyan-600 border-b-2 border-cyan-600 pb-2">
        <img src="../img/odontomixSinFondo.png" alt="Logotipo menu" />
      </Link>
      <ul>
        <li>
          <button onClick={() => handleMenuClick('crear')} className={`flex flex-1 items-center w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${isPathActive('/vista') ? 'bg-cyan-600' : (activeMenu === 'crear' ? 'bg-cyan-600' : '')}`}>Clientes-Pacientes {activeMenu === 'crear' ? <AiOutlineCaretUp className='ml-9' /> : <AiOutlineCaretDown className='ml-9' />}</button>
        
          {(activeMenu === 'crear'  && (
            <ul className="ml-5 space-y-2 mt-2">
              <li onClick={() => handleSubMenuClick('vista-cliente')}><Link to="/cliente/vista-cliente" className={`block py-2 px-4 rounded transition duration-200 hover:bg-indigo-500 hover:text-white ${isPathActive('/cliente') ? 'bg-indigo-500' : (activeSubMenu === 'crear-cliente' ? 'bg-indigo-500' : '')}`}>Lista de clientes</Link></li>
              <li onClick={() => handleSubMenuClick('crear-paciente')}><Link to="/paciente/vista-paciente" className={`block py-2 px-4 rounded transition duration-200 hover:bg-indigo-500 hover:text-white ${isPathActive('/paciente') ? 'bg-indigo-500' : (activeSubMenu === 'crear-paciente' ? 'bg-indigo-500' : '')}`}>Lista de paciente</Link></li>
            </ul>
          ))}
        </li>
        <li><Link onClick={() => handleMenuClick('acerca')} to="/" className={`block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white ${activeMenu == 'acerca' ? 'bg-cyan-600' : ''}`}>Acerca de</Link></li>
        <li>
          <button className="block w-full text-left py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white">Servicios</button>
        </li>
        <li><Link to="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-cyan-600 hover:text-white">Contacto</Link></li>
      </ul>
    </div>
  );
}

