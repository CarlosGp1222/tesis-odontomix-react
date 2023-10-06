import { Outlet, useLocation } from "react-router-dom"

import Modal from 'react-modal'
import Sidebar from "../components/Sidebar";
import useDental from "../hooks/useDental";
import ClienteModal from "../components/ClienteModal";
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '800px'
  },
};

Modal.setAppElement('#root');

export default function Layout() {
  const { modal } = useDental();
  return (
    <>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 bg-gray-200">
          <Outlet />
        </div>
      </div>
      <Modal isOpen={modal} style={customStyles} >
        <ClienteModal />
      </Modal>
    </>
  )
}
