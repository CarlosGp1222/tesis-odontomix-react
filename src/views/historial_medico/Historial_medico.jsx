import { useEffect, useState } from "react";
import useSWR from "swr";
import clienteAxios from "../../config/axios";

export default function Historial_medico() {
    const [historial_medicos, setHistorial_medico] = useState([]);
    const fetcher = () => clienteAxios('api/historial_medico').then(datos => datos.data)
    const { data, isLoading } = useSWR('api/historial_medico', fetcher)

    useEffect(() => {
        if (data && data.data) {
            setHistorial_medico(data.data);
        }
    }, [data]);
    
    console.log(historial_medicos);
    
    return;
    if (isLoading) return <Spinner />
    return (
        <div className="min-w-full overflow-hidden rounded-lg shadow p-4">
            <div className="mb-4 mt-4">
                <h3 className="text-gray-600 text-3xl font-medium text-center font-serif">Lista de Clientes</h3>
            </div>
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                            Nombres y Apellidos
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Identificación
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Género
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Edad
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Teléfono
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Correo
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Acción
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {historial_medicos.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="px-5 py-5 border-b border-gray-200 bg-white text-base font-serif text-center">
                                No hay ningún paciente aún
                            </td>
                        </tr>
                    ) : (  

                        historial_medicos.map(historial_medico => (
                    <tr key={historial_medico.idhistorial}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-serif text-center">
                            {historial_medico.historial_medicos}
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-mono text-right">
                            {historial_medico.identificacion_cliente}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-serif text-center">
                            {historial_medico.genero_cliente}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-mono text-right">
                            {historial_medico.edad_cliente}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-mono text-right">
                            {historial_medico.telefono_cliente}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-base font-serif text-center">
                            {historial_medico.correo_cliente}
                        </td>
                        {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <button onClick={(event) => handleDatosActual(historial_medico)} className="text-blue-500 hover:text-blue-700 mr-4">
                                <FaEdit />
                            </button>
                            <button onClick={(event) => handleEliminarDatos(historial_medico.idcliente, 'api/clientes')} className="text-red-500 hover:text-red-700">
                                <FaTrash />
                            </button>
                        </td> */}
                    </tr>
                    ) ))}
                </tbody>
            </table>
        </div>
    )
}
