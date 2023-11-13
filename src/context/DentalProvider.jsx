import { createContext, useEffect, useState } from 'react'
import DatabaseSimulator from '../data/DatabaseSimulator';
import PacientesDatabaseSimulator from '../data/PacientesDatabaseSimulator';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import clienteAxios from '../config/axios';

const DentalContext = createContext();
// const db = new DatabaseSimulator();
// const pdb = new PacientesDatabaseSimulator();
const DentalProvider = ({ children }) => {

    const [modal, setModal] = useState(false);
    const [datosActual, setDatosActual] = useState({});
    const [datosId, setDatosId] = useState({});
    const [examenCabeza, setExamenCabeza] = useState({});
    const [examenCara, setExamenCara] = useState({});
    const [examenATM, setExamenATM] = useState({});
    const [examenGanglios, setExamenGanglios] = useState({});
    const [examenLabios, setExamenLabios] = useState({});
    const [examenSeñas, setExamenSeñas] = useState({});
    const [tipoModal, setTipoModal] = useState(false);
    const [refresh, setRefresh] = useState(false);

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
        const { data } = await clienteAxios.get(`api/examen_cabeza`);
        setExamenCabeza(data.data);
        const { data: data2 } = await clienteAxios.get(`api/examen_cara`);
        setExamenCara(data2.data);
        const { data: data3 } = await clienteAxios.get(`api/examen_atm`);
        setExamenATM(data3.data);
        const { data: data4 } = await clienteAxios.get(`api/examen_ganglios`);
        setExamenGanglios(data4.data);
        const { data: data5 } = await clienteAxios.get(`api/examen_labios`);
        setExamenLabios(data5.data);
        const { data: data6 } = await clienteAxios.get(`api/señas_particulares`);
        setExamenSeñas(data6.data);        
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

    const handleSubmitHistorial = async (datos, url) => {
        try {
            
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



    const handleCompletarCita = async (id, url, cita) => {

        cita.estado_cita = 1;

        try {
            Swal.fire({
                title:`Desea completar la cita?`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    await clienteAxios.put(`${url}/${id}`, cita);
                    const datos = {
                        idcita: cita.idcita,
                        motivo_consulta: cita.concepto_cita,
                        //fecha actual en formato yyyy-mm-dd con hora 00:00:00
                        fecha_consulta: new Date().toISOString().slice(0, 10) + ' ' + '00:00:00',
                    }
                    const { data: dataCita } = await clienteAxios.post(`api/consultas`,datos);
                    console.log(dataCita);
                    setRefresh(!refresh);
                    Swal.fire('Cita actualizada correctamente!', '', 'success')
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

        if (typeof error.response.data.message === 'string') {
            mensajesError.push(error.response.data.message);
        } else {
            mensajesError = Object.values(error.response.data.message).map(val =>
                Array.isArray(val) ? val.join(' ') : val
            );
        }
        return mensajesError;
    }

    const handleEditarDatos = (id, usr, url) => {
        Swal.fire({
            title: `Desea actualizar informacion?`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const { data } = await clienteAxios.put(`${url}/${id}`, usr);
                setRefresh(!refresh);
                Swal.fire('Cambios Guardados!', '', 'success')
                toast.info(`Datos actualizado correctamente`);
                handleClickModal();
            } else if (result.isDenied) {
                Swal.fire('No se guardaron los cambios', '', 'info')
                handleClickModal();
            }

        })
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
                examenCabeza,
                examenCara,
                examenATM,
                examenGanglios,
                examenLabios,
                examenSeñas,
                
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