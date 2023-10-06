export default function ClienteModal() {
    return (
        <div className="p-4 ">
            <h2 className="text-center mb-4 text-xl font-bold">Cliente</h2>
            <form className="bg-white p-4 rounded grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Identificación:</label>
                    <select name="ididentificacion" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="1">Cédula</option>
                        <option value="2">RUC</option>
                        <option value="3">Pasaporte</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nombres:</label>
                    <input type="text" name="nombres_cliente" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Apellidos:</label>
                    <input type="text" name="apellidos_cliente" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Identificación cliente:</label>
                    <input type="text" name="identificacion_cliente" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Género:</label>
                    <select name="genero_cliente" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Edad:</label>
                    <input type="number" name="edad_cliente" placeholder="Ingrese edad" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono:</label>
                    <input type="text" name="telefono_cliente" placeholder="Ingrese teléfono" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Correo:</label>
                    <input type="email" name="correo_cliente" placeholder="Ingrese correo electrónico" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="col-span-2 flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Enviar</button>
                </div>
            </form>

        </div>
    )
}
