import {createContext, useState} from 'react'

const DentalContext = createContext();

const DentalProvider = ({children}) => {
    const [modal, setModal] = useState(false);

    const handleClickModal = () => {
        setModal(!modal);
    }

    return (
        <DentalContext.Provider
            value={{
                modal,
                handleClickModal,                
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