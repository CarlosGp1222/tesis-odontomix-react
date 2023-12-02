import { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import clienteAxios from '../config/axios';
import {mutate} from 'swr';
const DentalContext = createContext();
// const db = new DatabaseSimulator();
// const pdb = new PacientesDatabaseSimulator();
const DentalProvider = ({ children }) => {

    const [modal, setModal] = useState(false);
    const [datosActual, setDatosActual] = useState({});
    const [datosId, setDatosId] = useState({});    
    const [tipoModal, setTipoModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [datosPosicion, setDatosPosicion] = useState({});//[{}

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
        //obtner datos de la base de datos http://localhost:8000/api/identificacion
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
            // const { data } = await clienteAxios.get(`${url}`);
            return data.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return []; // o puedes manejar el error de la forma que prefieras
        }
    }

    const handleSubmitHistorial = async (arrayEnfermedades, Preguntas, Examenes, idPaciente, idConsulta) => {
        try {
            // var idPregunta;
            if (arrayEnfermedades.length > 0) {
                for (let index = 0; index < arrayEnfermedades.length; index++) {
                    const datosEnfermedad = {
                        idenfermedadpaciente: idConsulta,
                        idpaciente: arrayEnfermedades[index].idpaciente,
                        idenfermedad: arrayEnfermedades[index].idenfermedad,
                        tratamiento_enfermedad: arrayEnfermedades[index].tratamiento_enfermedad,
                        
                    }
                    // console.log(datosEnfermedad);                               
                    const { data: datosEnfermedadP } = await clienteAxios.post(`api/enfermedad_paciente`, datosEnfermedad);
                    // console.log(datosEnfermedadP); 
                }
            }

            // if (Preguntas.respuesta1 !== '' || Preguntas.respuesta2 !== '' || Preguntas.respuesta3 !== '' || Preguntas.respuesta4 !== '') {
            const { data: datosPreguntas } = await clienteAxios.post(`api/preguntas`, Preguntas);
            const { data: datosExamenes } = await clienteAxios.post(`api/examen_extraoral`, Examenes);
            // console.log(datosExamenes.data.idextraoral);

            const DatosHistorial = {
                idpaciente: idPaciente,
                idconsulta: idConsulta,
                idenfermedad_paciente: idConsulta,
                idpregunta: datosPreguntas.data.idpreguntas ? datosPreguntas.data.idpreguntas : '',
                idexamen_extraoral: datosExamenes.data.idextraoral ? datosExamenes.data.idextraoral : '',
                estado_historial: 0,
            }
            console.log(DatosHistorial);
            const { data: historial } = await clienteAxios.post(`api/historial_medico`, DatosHistorial);
            console.log(historial);

        } catch (error) {
            // setErrores(Object.values(error.response.data.errors));
            console.log(error?.response?.data?.errors);
            const mensajesError = handleErrores(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: mensajesError[0]
            })
            // toast.error();
        }
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
            // setErrores(Object.values(error.response.data.errors));
            console.log(error.response.data.errors);
            const mensajesError = handleErrores(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: mensajesError[0]
            })
            // toast.error();
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

    const handleToastSuccess = (metodo) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                metodo();
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
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
                handleErrores
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