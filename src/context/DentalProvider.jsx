import { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import clienteAxios from '../config/axios';
import { mutate } from 'swr';
const DentalContext = createContext();
const DentalProvider = ({ children }) => {

    const [modal, setModal] = useState(false);
    const [datosActual, setDatosActual] = useState({});
    const [datosId, setDatosId] = useState({});
    const [tipoModal, setTipoModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [datosPosicion, setDatosPosicion] = useState({});
    const [dientes, setDientes] = useState({});

    const handleClickModal = () => {
        if (modal === true) {
            setDatosActual({});
        }
        setModal(!modal);
    }

    const getDatos = async () => {
        const { data } = await clienteAxios.get(`api/identificacion`);
        setDatosId(data.data);
    }

    const getExamenes = async () => {
        const { data: Poisciones } = await clienteAxios.get(`api/posicion_dental`);
        setDatosPosicion(Poisciones.data);
    }

    useEffect(() => {
        getDatos();
        getExamenes();
    }, [])

    const handleTipoModal = (tipo) => {
        setTipoModal(tipo);
    }

    const handleDatosActual = (cliente, Modal = true) => {
        setDatosActual(cliente);
        if (Modal) {
            handleClickModal();
        }
    }

    const handleGetDatos = async (url) => {
        try {
            const fetcher = () => clienteAxios(`${url}`).then(datos => datos.data)
            const { data, isLoading } = useSWR(`${url}`, fetcher, {
                refreshInterval: 3000
            })
            return data.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }

    const handleSubmitHistorial = async (arrayEnfermedades, Preguntas, Examenes, idPaciente, idConsulta, navigate) => {
        try {
            if (arrayEnfermedades.length > 0) {
                for (let index = 0; index < arrayEnfermedades.length; index++) {
                    const datosEnfermedad = {
                        idenfermedadpaciente: idConsulta,
                        idpaciente: arrayEnfermedades[index].idpaciente,
                        idenfermedad: arrayEnfermedades[index].idenfermedad,
                        tratamiento_enfermedad: arrayEnfermedades[index].tratamiento_enfermedad,

                    }
                    const { data: datosEnfermedadP } = await clienteAxios.post(`api/enfermedad_paciente`, datosEnfermedad);
                }
            }

            const { data: datosPreguntas } = await clienteAxios.post(`api/preguntas`, Preguntas);
            const { data: datosExamenes } = await clienteAxios.post(`api/examen_extraoral`, Examenes);

            const DatosHistorial = {
                idpaciente: idPaciente,
                idconsulta: idConsulta,
                idenfermedad_paciente: arrayEnfermedades.length > 0 ? idConsulta : '',
                idpregunta: datosPreguntas?.data?.idpreguntas ? datosPreguntas?.data?.idpreguntas : '',
                idexamen_extraoral: datosExamenes.data.idextraoral ? datosExamenes.data.idextraoral : '',
                estado_historial: 0,
            }
            console.log(DatosHistorial);
            const { data: historial } = await clienteAxios.post(`api/historial_medico`, DatosHistorial);
            toast.info(`Datos ingresados correctamente`);
            navigate(`/odontograma/creacion-odontograma/${historial.data.numero_ficha}`)
        } catch (error) {

            console.log(error);
            const mensajesError = handleErrores(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: mensajesError[0]
            })
        }
    }

    const handleRedireccionar = (navigate,url) => {
        navigate(url);
    }

    const handleCompletarCita = async (id, url, cita) => {
        cita.estado_cita = 1;
        try {
            Swal.fire({
                title: `Desea completar la cita?`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await clienteAxios.put(`${url}/${id}`, cita);
                    const datos = {
                        idcita: cita.idcita,
                        motivo_consulta: cita.concepto_cita,
                        fecha_consulta: new Date().toISOString().slice(0, 10) + ' ' + '00:00:00',
                        estado_consulta: 0,
                    }
                    console.log(datos);
                    const { data: dataCita } = await clienteAxios.post(`api/consultas`, datos);
                    console.log(dataCita);
                    setRefresh(!refresh);
                    Swal.fire('Cita actualizada correctamente!', '', 'success')
                    mutate(url);
                } else if (result.isDenied) {
                    Swal.fire('No se actualizo correctamente', '', 'info')
                }

            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleIngresarDatos = async (datos, url) => {
        try {
            console.log(datos);
            const { data } = await clienteAxios.post(`${url}`, datos);
            toast.info(`Datos ingresados correctamente`);
            handleClickModal();
            mutate(url);
        } catch (error) {
            // console.log(error.response.data.errors);
            const mensajesError = handleErrores(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: mensajesError[0]
            })
        }

    }

    const handleErrores = (error) => {
        let mensajesError = [];

        if (typeof error?.response?.data?.errors === 'string') {
            mensajesError.push(error.response.data.errors);
        } else {
            mensajesError = Object.values(error.response.data.errors).map(val =>
                Array.isArray(val) ? val.join(' ') : val
            );
        }
        return mensajesError;
    }

    const handleEditarDatos = (id, usr, url) => {
        try {

            Swal.fire({
                title: `Desea actualizar informacion?`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    try {

                        const { data } = await clienteAxios.put(`${url}/${id}`, usr);
                        mutate(url);
                        setRefresh(!refresh);
                        Swal.fire('Cambios Guardados!', '', 'success')
                        toast.info(`Datos actualizado correctamente`);
                        handleClickModal();

                    } catch (error) {
                        console.log(error?.response?.data?.errors);
                        const mensajesError = handleErrores(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: mensajesError[0]
                        })
                    }

                } else if (result.isDenied) {
                    Swal.fire('No se guardaron los cambios', '', 'info')
                    handleClickModal();
                }

            })
        } catch (error) {
            console.log(error?.response?.data?.errors);
            const mensajesError = handleErrores(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: mensajesError[0]
            })
        }
    }

    const handleErrorSweet = (valor) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${valor}!`,
        })
    }

    const handleEliminarDatos = (id, url) => {
        Swal.fire({
            title: 'Estas seguro de eliminarlo?',
            text: "No podras recuperar la información!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`${url}/${id}`);
                Swal.fire(
                    'Eliminado!',
                    'Los datos fueron eliminados con exito.',
                    'success'
                )
            }
        })

    }

    const handleDientes = async(id, url) => {
        try {
            const { data } = await clienteAxios.get(`${url}/${id}`);
            setDientes(data.data);
        } catch (error) {
            console.log(error);
            setDientes({});
        }
    }
    
    return (
        <DentalContext.Provider
            value={{
                modal,
                handleClickModal,
                handleGetDatos,
                handleIngresarDatos,
                handleDatosActual,
                datosActual,
                handleEditarDatos,
                handleTipoModal,
                tipoModal,
                handleEliminarDatos,
                refresh,
                datosId,
                handleCompletarCita,
                handleSubmitHistorial,
                datosPosicion,
                handleErrores,
                handleErrorSweet,
                dientes,
                handleDientes,
                handleRedireccionar
            }}
        >
            {children}
        </DentalContext.Provider>
    )
}

export {
    DentalProvider
}

export default DentalContext;