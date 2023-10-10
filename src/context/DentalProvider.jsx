import {createContext, useState} from 'react'
import DatabaseSimulator from '../data/DatabaseSimulator';
import PacientesDatabaseSimulator from '../data/PacientesDatabaseSimulator';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import clienteAxios from '../config/axios';

const DentalContext = createContext();
const db = new DatabaseSimulator();
const pdb = new PacientesDatabaseSimulator();
const DentalProvider = ({children}) => {
    
    const [modal, setModal] = useState(false);
    const [datosActual, setDatosActual] = useState({});
    const [datos, setDatos] = useState({});
    const [tipoModal, setTipoModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const handleClickModal = () => {
        if (modal === true) {
            setDatosActual({});
        }
        setModal(!modal);
    }

    const handleTipoModal = (tipo) => {
        setTipoModal(tipo);
    }


    const handleDatosActual = (cliente) => {;
        setDatosActual(cliente);
        handleClickModal();
    }

    const handleGetDatos = async (url) => {
        try {
            const {data} = await clienteAxios.get(`${url}`);
            return data.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return []; // o puedes manejar el error de la forma que prefieras
        }
    }
    

    const handleIngresarDatos = async (datos, url) => {
        try {
            console.log(datos);
            const { data } = await clienteAxios.post(`${url}`, datos);
            console.log(data);
            // setErrores([]);
        } catch (error) {
            // setErrores(Object.values(error.response.data.errors));
            console.log(error.response.data.errors);
        }
        handleClickModal();
    }

    const handleEditarDatos = (id,usr, url) => {
        Swal.fire({
            title: `Desea actualizar informacion?`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                if (url == 'cliente') {
                    db.updateClienteById(id,usr);
                } else if(url == 'paciente'){
                    pdb.updatePacienteById(id,usr);
                }
                Swal.fire('Cambios Guardados!', '', 'success')
                toast.info(`Datos actualizado correctamente`);
                handleClickModal();
            } else if (result.isDenied) {
                Swal.fire('No se guardaron los cambios', '', 'info')
                handleClickModal();
            }
            
        })
    }
    

    const handleEliminarDatos = (id, url) => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "No podras recuperar la información!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
                if (url == 'cliente') {
                    db.deleteClienteById(id);                    
                } else if(url == 'paciente'){
                    pdb.deletePacienteById(id);
                }
                setRefresh(!refresh);
                toast.error('Datos eliminados con exito', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
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
                refresh
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