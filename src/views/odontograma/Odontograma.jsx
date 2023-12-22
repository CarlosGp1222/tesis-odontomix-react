import React, { useEffect, useState } from 'react'
import { MdOutlineContentPasteSearch, MdSouth } from "react-icons/md";
import Diente from './Diente';
import useSWR, { mutate } from 'swr'
import clienteAxios from "../../config/axios";
import Spinner from '../../components/Spinner';
import useDental from '../../hooks/useDental';
import { useParams } from 'react-router-dom';

export default function odontograma() {
    const { handleTipoModal, handleDientes } = useDental();
    const { idHistorial } = useParams();

    const [datosId, setDatosId] = useState({});

    const fetcherHisto = url => clienteAxios(url).then(res => res.data);
    const { data: datosHistorial, error, isLoading: isLoadingDatosHistorial } = useSWR(idHistorial ? `api/historial_medico/${idHistorial}` : null, fetcherHisto);

    useEffect(() => {
        handleTipoModal('odontograma');
        if (datosHistorial && datosHistorial.data.idhistorial) {
            setDatosId(datosHistorial.data.idhistorial);
            handleDientes(datosHistorial?.data?.idhistorial, 'api/dientes');
            refrescarDientes();
        }
    }, [datosHistorial]);

    const refrescarDientes = () => {
        mutate();
    };    

    

    const fetcher = () => clienteAxios('api/ubicacion_dental').then(datos => datos.data)
    const { data: Datosdientes, isLoading, mutate } = useSWR('api/ubicacion_dental', fetcher)

    const dientes = Datosdientes?.data;
    const datosPaciente = datosHistorial?.data?.paciente;

    if (isLoading || isLoadingDatosHistorial) return <Spinner />

    const renderizarDientes = (rangoInicio, rangoFin) => dientes
        .filter(diente => diente.ubicacion_diente >= rangoInicio && diente.ubicacion_diente <= rangoFin)
        .map(diente => <Diente key={diente.ubicacion_diente} numero={diente.ubicacion_diente} idHistorial={datosId} idubicacion={diente.idubicaciond} nombre_diente={diente.nombre_diente} numeroFicha={idHistorial} />);



    return (
        <div className='mt-5'>
            <div className="flex justify-center items-center gap-4">
                <div className="flex items-center gap-4">
                    <MdOutlineContentPasteSearch size={24} />
                    <input type="text" placeholder="Buscar por identidad" className="border border-gray-400 rounded-lg p-2 focus:outline-none" />
                </div>
            </div>
            <div className='w-full flex flex-col bg-slate-300 justify-between p-4 mt-4 md:flex-row'>
                <div className='w-1/2'>
                    <h2 className='font-bold'>Nombre: <span className='font-normal'>{(datosPaciente?.nombre_paciente ? datosPaciente.nombre_paciente : 'Sin datos') + " " + (datosPaciente?.apellidos_paciente ? datosPaciente.apellidos_paciente : '')}</span></h2>
                </div>
                <div className='w-1/2'>
                    <h2 className='font-bold'>Identificación: <span className='font-normal'>{datosPaciente?.identificacion_paciente ? datosPaciente?.identificacion_paciente : 'Sin datos'}</span></h2>
                </div>
            </div>
            <div className='w-full flex flex-col bg-slate-300 justify-between p-4 md:flex-row'>
                <div className='w-1/2'>
                    <h2 className='font-bold'>Edad: <span className='font-normal'>{datosPaciente?.edad_paciente ? datosPaciente?.edad_paciente : 'Sin datos'}</span></h2>
                </div>
                <div className='w-1/2'>
                    <h2 className='font-bold'>Genero: <span className='font-normal'>{datosPaciente?.genero_paciente == 'M' ? 'Masculino' : (datosPaciente?.genero_paciente == 'F' ? 'Femenino' : 'Sin Datos')}</span></h2>
                </div>
            </div>
            <div className='w-full flex flex-col bg-slate-300 justify-between p-4 md:flex-row'>
                <div className='w-1/2'>
                    <h2 className='font-bold'>Altura: <span className='font-normal'>{datosPaciente?.altura_paciente ? datosPaciente?.altura_paciente + ' M' : 'Sin datos'}</span></h2>
                </div>
                <div className='w-1/2'>
                    <h2 className='font-bold'>Peso: <span className='font-normal'>{datosPaciente?.peso_paciente ? datosPaciente?.peso_paciente + ' Kg' : 'Sin datos'}</span></h2>
                </div>
            </div>

            <div className="flex flex-wrap justify-around mt-2">
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
        </div>
    );
}
