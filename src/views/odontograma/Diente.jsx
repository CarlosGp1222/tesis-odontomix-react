import React, { useEffect } from 'react';
import useDental from '../../hooks/useDental';
import Spinner from '../../components/Spinner';
import MiniSpinner from '../../components/MiniSpiner';

const Diente = ({ numero }) => {

    const { datosPosicion, handleDatosActual } = useDental();
    if (Object.keys(datosPosicion).length === 0) return  <MiniSpinner />

    const handlePartClick = (idposiciond) => {
        try {
            const posicion = datosPosicion.find(p => p.idposiciond === idposiciond);
            const datos = {
                idposiciond: posicion.idposiciond,
                nombre_posiciond: posicion.nombre_posiciond,
                numDiente: numero
            };
            handleDatosActual(datos);
        } catch (error) {
            alert('Cargando datos de los dientes');
        }
    };

    return (
        <div className="relative flex items-center justify-end w-16 h-20">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <div className="h-3 w-8 bg-transparent border-2 border-gray-400 cursor-pointer rounded-lg hover:bg-slate-300"
                        onClick={() => handlePartClick(1)}></div>
                    <div className="flex w-full justify-between px-1"> {/* Ajustado el espaciado */}
                        <div className="h-8 w-3 bg-transparent border-2 border-gray-400 cursor-pointer rounded-lg hover:bg-slate-300"
                            onClick={() => handlePartClick(2)}></div>
                        <div className="h-8 w-8 bg-transparent border-2 border-gray-400 cursor-pointer rounded-lg hover:bg-slate-300"
                            onClick={() => handlePartClick(5)}>
                            <div className="w-full text-center p-1 text-xs">{numero}</div>
                        </div>
                        <div className="h-8 w-3 bg-transparent border-2 border-gray-400 cursor-pointer rounded-lg hover:bg-slate-300"
                            onClick={() => handlePartClick(3)}></div>
                    </div>
                    {/* Parte inferior del diente */}
                    <div className="h-3 w-8 bg-transparent border-2 border-gray-400 cursor-pointer rounded-lg hover:bg-slate-300"
                        onClick={() => handlePartClick(4)}></div>
                </div>
            </div>
            {/* Número del diente */}

        </div>
    );
};

export default Diente;
