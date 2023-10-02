import { Outlet } from "react-router-dom"
import Footer from "./Footer"

export default function AuthLayout() {
  return (
    <>
      <main className="max-w-4xl m-auto mt-10 md:mt-20 flex flex-col md:flex-row justify-center items-center">
        <img
          src="../img/LogoDienteSinFondo.png"
          alt="Imagen logo tipo"
          className="max-w-sm"
        />
        <div className="p-8 w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  )
}
