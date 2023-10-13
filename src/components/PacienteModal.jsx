import { FaTimes } from "react-icons/fa";
import useDental from "../hooks/useDental";
import { createRef } from "react";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
export default function PacienteModal() {
    const ididentificacion = createRef();
    const nombre_paciente = createRef();
    const apellidos_paciente = createRef();
    const identificacion_paciente = createRef();
    const altura_paciente = createRef();
    const peso_paciente = createRef();
    const genero_paciente = createRef();
    const edad_paciente = createRef();
    const direccion_paciente = createRef();
    const telefono_paciente = createRef();
    const correo_paciente = createRef();

    const { handleClickModal, handleIngresarDatos, datosActual, handleEditarDatos } = useDental();

    const handleEnviarPaciente = e => {
        e.preventDefault();
        const datos = {
            nombre_paciente: nombre_paciente.current.value,
            apellidos_paciente: apellidos_paciente.current.value,
            ididentificacion: ididentificacion.current.value,
            identificacion_paciente: identificacion_paciente.current.value,
            altura_paciente: altura_paciente.current.value,
            peso_paciente: peso_paciente.current.value,
            genero_paciente: genero_paciente.current.value,
            edad_paciente: edad_paciente.current.value,
            direccion_paciente: direccion_paciente.current.value,
            telefono_paciente: telefono_paciente.current.value,
            correo_paciente: correo_paciente.current.value,
        };
        if (datosActual.idpaciente != null) {
            handleEditarDatos(datosActual.idpaciente, datos, 'api/pacientes');
        } else {
            handleIngresarDatos(datos, 'api/pacientes');
            toast.info(`Paciente ${datos.nombre_paciente + " " + datos.apellidos_paciente} creado correctamente`);
        }
    }
    return (
        <div className="p-4 ">
            <div>
                <button className="float-right focus:outline-none" onClick={handleClickModal}>
                    <FaTimes />
                </button>
            </div>
            <h2 className="text-center mb-4 text-xl font-bold">{datosActual.idpaciente ? 'Actualizar Paciente' : 'Crear Paciente'}</h2>
            <form noValidate onSubmit={handleEnviarPaciente} className="bg-white p-4 rounded grid grid-cols-2 gap-4">
                {/* si exite datosActual esconder el div del input identficacion */}

                <div className={`${datosActual.idpaciente ? 'hidden' : ''}`}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Identificación:</label>
                    <select defaultValue={datosActual ? datosActual.ididentificacion : ''} ref={ididentificacion} name="ididentificacion" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="1">Cédula</option>
                        <option value="2">RUC</option>
                        <option value="3">Pasaporte</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nombres:</label>
                    <input defaultValue={datosActual ? datosActual.nombre_paciente : ''} ref={nombre_paciente} type="text" name="nombre_paciente" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Apellidos:</label>
                    <input defaultValue={datosActual ? datosActual.apellidos_paciente : ''} ref={apellidos_paciente} type="text" name="apellidos_paciente" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div
                    className={`${datosActual.idpaciente ? 'hidden' : ''}`}
                >
                    <label className="block text-gray-700 text-sm font-bold mb-2">Identificación paciente:</label>
                    <input defaultValue={datosActual ? datosActual.identificacion_paciente : ''} ref={identificacion_paciente} type="text" name="identificacion_paciente" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Altura (Metros):</label>
                    <input defaultValue={datosActual ? datosActual.altura_paciente : ''} ref={altura_paciente} type="number" name="altura_paciente" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Peso (Kilos):</label>
                    <input defaultValue={datosActual ? datosActual.peso_paciente : ''} ref={peso_paciente} type="number" name="peso_paciente" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Género:</label>
                    <select defaultValue={datosActual ? datosActual.genero_paciente : ''} ref={genero_paciente} name="genero_paciente" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Edad:</label>
                    <input defaultValue={datosActual ? datosActual.edad_paciente : ''} ref={edad_paciente} type="number" name="edad_paciente" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Dirección:</label>
                    <input defaultValue={datosActual ? datosActual.direccion_paciente : ''} ref={direccion_paciente} type="text" name="direccion_paciente" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono:</label>
                    <input defaultValue={datosActual ? datosActual.telefono_paciente : ''} ref={telefono_paciente} type="text" name="telefono_paciente" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className={`${datosActual.id}`}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Correo:</label>
                    <input defaultValue={datosActual ? datosActual.correo_paciente : ''} ref={correo_paciente} type="email" name="correo_paciente" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="col-span-2 flex justify-end">
                    <button type="submit" className="bg-slate-800 text-white px-6 py-2 rounded-full hover:bg-slate-900 focus:outline-none focus:bg-slate-900">
                        {datosActual.idpaciente ? 'Actualizar' : 'Crear'}
                    </button>
                </div>
            </form>
        </div>
    )

}
