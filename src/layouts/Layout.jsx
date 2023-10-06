import { Outlet, useLocation } from "react-router-dom"

import Modal from 'react-modal'
import Sidebar from "../components/Sidebar";
import useDental from "../hooks/useDental";
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
  // const { modal } = useDental();
  return (
    <>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-1 bg-gray-200">
          <Outlet />
        </div>
      </div>
      <Modal isOpen={false} style={customStyles} >
        
      </Modal>
    </>
  )
}
