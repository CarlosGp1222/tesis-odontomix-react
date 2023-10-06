import {createContext, useState} from 'react'
import DatabaseSimulator from '../data/DatabaseSimulator';

const DentalContext = createContext();
const db = new DatabaseSimulator();
const DentalProvider = ({children}) => {
    
    const [modal, setModal] = useState(false);


    const handleClickModal = () => {
        setModal(!modal);
    }

    const handleClientes = () => {
        return db.getAllClientes();
    }

    const handleCrearCliente = (cliente) => {
        db.addCliente(cliente);
    }

    return (
        <DentalContext.Provider
            value={{
                modal,
                handleClickModal,
                handleClientes,
                handleCrearCliente
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