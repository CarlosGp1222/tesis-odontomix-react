
import { FaTimes } from "react-icons/fa";
import { useState, createRef } from "react";
import { useNavigate } from 'react-router-dom'
import useDental from "../hooks/useDental";
import { toast } from "react-toastify";
// import DatabaseSimulator from "../database/DatabaseSimulator";

export default function ClienteModal() {
    const navigate = useNavigate();
    const ididentificacion = createRef();
    const identificacion_cliente = createRef();
    const nombre_cliente = createRef();
    const apellidos_cliente = createRef();
    const genero_cliente = createRef();
    const edad_cliente = createRef();
    const telefono_cliente = createRef();
    const correo_cliente = createRef();
    const direccion_cliente = createRef();
    const [validate, setValidate] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const { handleClickModal, handleIngresarDatos, datosActual, handleEditarDatos } = useDental();

    console.log(datosActual.id_cliente);
    const handleEnviarCliente = e => {
        e.preventDefault();
        const datos = {
            ididentificacion: ididentificacion.current.value,
            nombre_cliente: nombre_cliente.current.value,
            apellidos_cliente: apellidos_cliente.current.value,
            identificacion_cliente: identificacion_cliente.current.value,
            edad_cliente: edad_cliente.current.value,
            genero_cliente: genero_cliente.current.value,                                    
            telefono_cliente: telefono_cliente.current.value,
            direccion_cliente: direccion_cliente.current.value,
            correo_cliente: correo_cliente.current.value,
        };
        if (datosActual.id_cliente != null) {
            handleEditarDatos(datosActual.id_cliente, datos, 'cliente');
        } else {
            handleIngresarDatos(datos, 'api/cliente');
            toast.info(`Cliente ${datos.nombre_cliente +" "+ datos.apellidos_cliente} creado correctamente`);
        }
        
    }

    const handleValidaIdentificacion = () => {
        if (identificacion_cliente.current && identificacion_cliente.current.value !== '') {
            switch (ididentificacion.current.value) {
                case '1':
                    if (identificacion_cliente.current.value.length !== 10 || !/^[0-9]*$/.test(identificacion_cliente.current.value)) {
                        setErrorMsg('La cédula debe tener exactamente 10 dígitos.');
                        setValidate(false);
                    } else {
                        setErrorMsg('');
                        setValidate(true);
                    }
                    break;
                case '2':
                    if (identificacion_cliente.current.value.length !== 13 || !/^[0-9]*$/.test(identificacion_cliente.current.value)) {
                        setErrorMsg('El RUC debe tener exactamente 13 dígitos.');
                        setValidate(false);
                    } else {
                        setErrorMsg('');
                        setValidate(true);
                    }
                    break;
                case '3':
                    if (identificacion_cliente.current.value.length > 9) {
                        setErrorMsg('El pasaporte no debe tener más de 9 caracteres.');
                        setValidate(false);
                    } else {
                        setErrorMsg('');
                        setValidate(true);
                    }
                    break;
                default:
                    setErrorMsg('');
                    setValidate(true);
                    break;
            }
        } else {
            setErrorMsg('El campo no puede estar vacío.');
            setValidate(false);
        }
    }


    return (
        <div className="p-4">
            <div>
                <button className="float-right focus:outline-none" onClick={handleClickModal}>
                    <FaTimes />
                </button>
            </div>
            <h2 className="text-center mb-4 text-xl font-bold">{datosActual.id_cliente ? 'Actualizar cliente' : 'Crear cliente'}</h2>
            <form onSubmit={handleEnviarCliente} className="bg-white p-4 rounded grid grid-cols-2 gap-4">
                <div
                    className={`${datosActual.id_cliente ? 'hidden': ''}`}
                >
                    <label className="block text-gray-700 text-sm font-bold mb-2">Identificación:</label>
                    <select defaultValue={datosActual ? datosActual.ididentificacion : ''} ref={ididentificacion} onChange={handleValidaIdentificacion} name="ididentificacion" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="1">Cédula</option>
                        <option value="2">RUC</option>
                        <option value="3">Pasaporte</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nombres:</label>
                    <input defaultValue={datosActual ? datosActual.nombre_cliente : ''} ref={nombre_cliente} type="text" name="nombres_cliente" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Apellidos:</label>
                    <input defaultValue={datosActual ? datosActual.apellidos_cliente : ''} ref={apellidos_cliente} type="text" name="apellidos_cliente" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div
                    className={`${datosActual.id_cliente ? 'hidden': ''}`}
                >
                    <label className="block text-gray-700 text-sm font-bold mb-2">Identificación cliente:</label>
                    <input defaultValue={datosActual ? datosActual.identificacion_cliente : ''} ref={identificacion_cliente} onChange={handleValidaIdentificacion} type="text" name="identificacion_cliente" className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin ${validate ? '' : 'border-red-500'}`} />
                    {!validate && <p className="text-red-500 text-xs mt-1">{errorMsg}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Género:</label>
                    <select defaultValue={datosActual ? datosActual.genero_cliente : ''} ref={genero_cliente} name="genero_cliente" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Edad:</label>
                    <input defaultValue={datosActual ? datosActual.edad_cliente : ''} ref={edad_cliente} type="number" name="edad_cliente" placeholder="Ingrese edad" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono:</label>
                    <input defaultValue={datosActual ? datosActual.telefono_cliente : ''} ref={telefono_cliente} type="text" name="telefono_cliente" placeholder="Ingrese teléfono" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Correo:</label>
                    <input defaultValue={datosActual ? datosActual.correo_cliente : ''} ref={correo_cliente} type="email" name="correo_cliente" placeholder="Ingrese correo electrónico" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Direccion:</label>
                    <input defaultValue={datosActual ? datosActual.direccion_cliente : ''} ref={direccion_cliente} type="text" name="direccion_cliente" placeholder="Ingrese la direccion" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="col-span-2 flex justify-end">
                    <button type="submit" className="bg-slate-800 text-white px-6 py-2 rounded-full hover:bg-slate-900 focus:outline-none focus:bg-slate-900">
                        {datosActual.id_cliente ? 'Actualizar' : 'Crear'}
                    </button>
                </div>
            </form>

        </div>
    )
}
