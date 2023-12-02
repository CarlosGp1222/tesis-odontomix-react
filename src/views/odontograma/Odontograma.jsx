import React, { useEffect } from 'react'
import { MdOutlineContentPasteSearch } from "react-icons/md";
import Diente from './Diente';
import useSWR from 'swr'
import clienteAxios from "../../config/axios";
import Spinner from '../../components/Spinner';
import useDental from '../../hooks/useDental';

export default function odontograma() {
    const { handleTipoModal } = useDental();

    useEffect(() => {
        handleTipoModal('odontograma');
    });

    
    const fetcher = () => clienteAxios('api/ubicacion_dental').then(datos => datos.data)
    const { data: Datosdientes, isLoading } = useSWR('api/ubicacion_dental', fetcher)

    const dientes = Datosdientes?.data;

    if (isLoading) return <Spinner />

    const renderizarDientes = (rangoInicio, rangoFin) => dientes
        .filter(diente => diente.ubicacion_diente >= rangoInicio && diente.ubicacion_diente <= rangoFin)
        .map(diente => <Diente key={diente.ubicacion_diente} numero={diente.ubicacion_diente} />);

    

    return (
        <div className="flex flex-wrap justify-around">
            <div className="flex flex-col">
                <div className="flex justify-center mb-2">{renderizarDientes(11, 18)}</div>
                <div className="flex justify-end md:justify-center">{renderizarDientes(51, 55)}</div>
            </div>
            <div className="flex flex-col">
                <div className="flex justify-center mb-2">{renderizarDientes(21, 28)}</div>
                <div className="flex justify-center">{renderizarDientes(61, 65)}</div>
            </div>
            <div className="flex flex-col">
                <div className="flex justify-center mb-2">{renderizarDientes(81, 85)}</div>
                <div className="flex justify-center">{renderizarDientes(41, 48)}</div>
            </div>
            <div className="flex flex-col">
                <div className="flex justify-center mb-2">{renderizarDientes(71, 75)}</div>
                <div className="flex justify-center">{renderizarDientes(31, 38)}</div>
            </div>
        </div>
    );
}
