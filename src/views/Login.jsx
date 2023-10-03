export default function Login() {
  return (
    <>
      <h1 className="text-4xl font-black text-indigo-900">Inicia Sesión</h1>
      <p className="text-cyan-600 font-black pl-2">Inicia sesión con tus credenciales</p>

      <div className="bg-white drop-shadow-2xl rounded-md px-5 py-10">
        <form action="">
          <div className="mb-4">
            <label
              className="text-slate-800"
              htmlFor="email"
            >
              Correo electrónico
            </label>
            <input 
              type="email" 
              id="email"
              name="email"
              className="w-full p-3 mt-2 bg-gray-200"
              placeholder="Ingresa tu correo electrónico"
            />
          </div>
          <div className="mb-4">
            <label
              className="text-slate-800"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input 
              type="password" 
              id="password"
              name="password"
              className="w-full p-3 mt-2 bg-gray-200"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <input 
            type="submit" 
            value="Iniciar sesión"
            className="bg-indigo-900 hover:bg-indigo-950 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          />
        </form>
      </div>
    </>
  )
}
