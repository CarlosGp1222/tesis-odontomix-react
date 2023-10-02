import { Outlet } from "react-router-dom"
import { useState } from 'react';
import Sidebar from "../components/SideBar";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  )
}
