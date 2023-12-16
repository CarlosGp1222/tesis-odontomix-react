import React, { useEffect } from 'react';
import useDental from '../../hooks/useDental';
import Spinner from '../../components/Spinner';
import MiniSpinner from '../../components/MiniSpiner';
import { IoMdClose } from "react-icons/io";
const Diente = ({ numero, idHistorial, idubicacion, nombre_diente, numeroFicha }) => {

    const { datosPosicion, handleDatosActual, handleErrorSweet, dientes } = useDental();
    if (Object.keys(datosPosicion).length === 0) return <MiniSpinner />

    if (dientes.length === 0) {
        return (
            <div>
                <div className="w-full text-center p-1 text-xs font-bold bg-slate-300">{numero}</div>
                <div className="relative flex items-center justify-end w-16 h-16">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                            <div className="h-3 w-8 bg-transparent border-2 border-gray-400 cursor-pointer rounded-lg hover:bg-slate-300"
                                onClick={() => handlePartClick(1)}></div>
                            <div className="flex w-full justify-between px-1">
                                <div className="h-8 w-3 bg-transparent border-2 border-gray-400 cursor-pointer rounded-lg hover:bg-slate-300"
                                    onClick={() => handlePartClick(2)}></div>
                                <div className="h-8 w-8 bg-transparent border-2 border-gray-400 cursor-pointer rounded-lg hover:bg-slate-300"
                                    onClick={() => handlePartClick(5)}>
                                </div>
                                <div className="h-8 w-3 bg-transparent border-2 border-gray-400 cursor-pointer rounded-lg hover:bg-slate-300"
                                    onClick={() => handlePartClick(3)}></div>
                            </div>
                            <div className="h-3 w-8 bg-transparent border-2 border-gray-400 cursor-pointer rounded-lg hover:bg-slate-300"
                                onClick={() => handlePartClick(4)}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const handlePartClick = (idposiciond) => {

        if (typeof idHistorial === 'object' && idHistorial !== null) {

            handleErrorSweet('Error paciente no encontrado');
            return;

        }

        const datosDiente = dientes.find(d => d.idubicaciond === idubicacion && d.idposiciond === idposiciond);

        const posicion = datosPosicion.find(p => p.idposiciond === idposiciond);

        const datos = {
            idposiciond: posicion.idposiciond,
            nombre_posiciond: posicion.nombre_posiciond,
            numDiente: numero,
            idHistorial: idHistorial,
            idubicacion: idubicacion,
            nombre_diente: nombre_diente,
            numeroFicha: numeroFicha,
            idtratamientos: datosDiente?.idtratamientos ? datosDiente?.idtratamientos : null,
            idcondicionesd: datosDiente?.idcondicionesd ? datosDiente?.idcondicionesd : null,
            descripcion_diente: datosDiente?.descripcion_diente ? datosDiente?.descripcion_diente : '',
            datosDiente: datosDiente ? datosDiente : null,
        };

        handleDatosActual(datos);
    };

    const renderizarParteDiente = (idposicion, classes) => {
        if (dientes.length > 0) {
            const dienteEncontrado = dientes.find(diente => diente.idubicaciond === idubicacion && diente.idposiciond === idposicion);

            return (

                <div className={`relative ${classes} border-2 border-gray-400 cursor-pointer ${idposicion === 5 ? 'rounded-full' : 'rounded-lg'}`}
                    onClick={() => handlePartClick(idposicion)}>
                    <div
                        style={{ backgroundColor: dienteEncontrado?.condiciones_dentales.color_condicion || 'transparent' }}
                        className={`absolute inset-0 bg-transparent ${idposicion === 5 ? 'rounded-full' : 'rounded-lg'}`}>
                    </div>

                    {/* {mostrarIconoCerrar && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <IoMdClose style={{ color: iconColor, width: '90px', height: '100px' }} />
                        </div>
                    )} */}
                </div>
            );
        }
    };

    const dienteConCondicionTres = dientes.length > 0 && dientes.some(diente => diente.idubicaciond === idubicacion && diente.idcondicionesd === 3 && diente.idposiciond === 5);
    const borderColor = dienteConCondicionTres ? 'border-blue-600 rounded-full' : ''; // Color azul si idcondicionesd es 3
    // const tieneCondicionTres = dientes.length > 0 && dientes.some(diente => diente.idubicaciond === idubicacion && diente.idcondicionesd === 3);
    // const bordeExterior = tieneCondicionTres ? 'border-blue-500' : 'border-gray-400'; // Aplica borde azul si idcondicionesd es 3


    const getIconColor = (diente) => {
        return diente?.idcondicionesd === 1 || diente?.idcondicionesd === 3 ? 'blue' : diente?.idcondicionesd === 2 ? 'red' : 'transparent';
    };


    const dienteConIcono = dientes.length > 0 && dientes.find(diente => diente.idubicaciond === idubicacion && diente.idposiciond === 5 && (diente.idcondicionesd === 1 || diente.idcondicionesd === 2));

    // const borderColor = dienteConCondicionTres ? 'border-blue-500' : 'border-gray-400'; // Cambia 'border-blue-500' por el color deseado

    return (
        <div>
            <div className="w-full text-center p-1 text-xs font-bold bg-slate-300">{numero}</div>
            <div className={`relative flex items-center justify-center w-16 h-16 ${borderColor? borderColor+' border-2' : ''}`}>
                <div className={`absolute inset-0 flex items-center justify-center`}>
                    <div className="flex flex-col items-center justify-center">
                        {renderizarParteDiente(1, 'h-3 w-8')}
                        <div className="flex w-full justify-between px-1">
                            {renderizarParteDiente(2, 'h-8 w-3')}
                            {renderizarParteDiente(5, 'h-8 w-8')}
                            {renderizarParteDiente(3, 'h-8 w-3')}
                        </div>
                        {renderizarParteDiente(4, 'h-3 w-8')}
                    </div>
                </div>
                {dienteConIcono && (
                    <IoMdClose className="absolute " style={{ color: getIconColor(dienteConIcono), width: '90px', height: '100px', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', pointerEvents: 'none' }} />
                )}
            </div>
        </div>
    );

};

export default Diente;
