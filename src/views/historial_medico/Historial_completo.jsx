import React, { useState, useEffect } from 'react'
// import { useEffect } from 'react';
// import { Link, Navigate, useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import useDental from '../../hooks/useDental';
import clienteAxios from '../../config/axios';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';

export default function Historial_completo() {
    const [historial_medico, setHistorial_medico] = useState([]);
    const idHistorial = localStorage.getItem('IDHISTORIAL');
    // const { idHistorial } = useParams();
    const fetcher = () => clienteAxios(idHistorial ? `api/historial_medico/${idHistorial}` : null).then(datos => datos.data)
    const { data, error, isLoading } = useSWR(`api/historial_medico/${idHistorial}`, fetcher)
    const [enfermedades, setEnfermedades] = useState([]);
    
    useEffect(() => {
        // console.log(data?.data);
        if (data && data.data) {
            // console.log(data);
            setHistorial_medico(data.data);
            setEnfermedades(data.data.enfermedad_paciente);
        }
    }, [data, isLoading, idHistorial]);

    if (isLoading) return <Spinner />
    // console.log(isLoading);

    console.log(data);

    if (historial_medico.length == 0) {
        return;
    }

    

    // const enfermedadesArray = historial_medico?.enfermedad_paciente;
    // console.log(enfermedadesArray);


    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="w-full max-w-6xl bg-white shadow-md rounded px-8 pt-6 pb-8">

                <div className='flex max-h-40 justify-center items-center'>


                    <div className="flex justify-start">

                        <img src="../img/logo-sinfondo.png" className='max-h-40' alt="Logo" />


                    </div>
                    <div className='text-base font-bold flex-1 text-center '>
                        <h1 className="font-serif">CENTRO DE ATENCIÓN ODONTOLÓGICA – OD. JUAN MURILLO LLANOS</h1>
                        <h2>Cdla. Luis Morejón Almeida Manzana A2 Villa 16/ Calle 1 S-O y José de la Cuadra.</h2>
                        <h3>Celular: 0982247948. Bio: https://biolink.info/odontomix</h3>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-2 gap-y-5">
                    <div className='flex flex-col'>
                        <label className='border-b-2 font-serif font-bold text-base mb-2'>
                            Fecha de la consulta
                        </label>
                        <span className='ml-2'>{historial_medico?.fecha_historial}</span>
                    </div>
                    <div className='flex flex-col'>
                        <label className='border-b-2 font-serif font-bold text-base mb-2'>
                            Numero de Ficha
                        </label>
                        <span className='ml-2'>{historial_medico?.numero_ficha}</span>
                    </div>
                    <div className='flex flex-col'>
                        <label className='border-b-2 font-serif font-bold text-base mb-2'>
                            Nombre del paciente
                        </label>
                        <span className='ml-2'>{historial_medico?.paciente?.nombre_paciente + " " + historial_medico?.paciente.apellidos_paciente}</span>
                    </div>
                    <div className='flex flex-col'>
                        <label className='border-b-2 font-serif font-bold text-base mb-2'>
                            Motivo por el cual visito el consultorio dental
                        </label>
                        <span className='ml-2'>{historial_medico?.consulta?.cita.concepto_cita}</span>
                    </div>
                    <div className='flex text-sm flex-col border-2 p-4'>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            Edad
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.paciente.edad_paciente}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            Genero
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.paciente.genero_paciente == 'M' ? 'Masculino' : (historial_medico?.paciente.genero_paciente == 'F' ? 'Femenino' : '')}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            Altura
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.paciente.altura_paciente + " Metros"}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            Peso
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.paciente.peso_paciente + " Kg"}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            Dirección de domicilio
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.paciente.direccion_paciente}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            Teléfono / Celular
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.paciente.telefono_paciente}</span>
                    </div>
                    <div className='flex text-sm flex-col border-2 p-4'>
                        <label className='border-b-2 font-serif font-bold text-center mb-2'>
                            Ha presentado complicaciones
                            <span className='block text-center'>
                                ¿Cuáles?
                            </span>
                        </label>
                        <span className='ml-2 mb-6'>{historial_medico?.pregunta?.respuesta1 || 'Ninguno'}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            ¿Está siendo tratado por un médico actualmente?
                            <span className='block text-center'>
                                ¿Para qué enfermedad?
                            </span>
                        </label>
                        <span className='ml-2 mb-6'>{historial_medico?.pregunta?.respuesta2 || 'Ninguna'}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            ¿Está tomando algún tipo de medicamento?
                            <span className='block text-center'>
                                ¿Cuáles y con qué dosis?
                            </span>
                        </label>
                        <span className='ml-2 mb-6'>{historial_medico?.pregunta?.respuesta3 || 'Ninguna'}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            ¿Es usted alérgico/a algún medicamento?
                            <span className='block text-center'>
                                ¿Cuáles?
                            </span>
                        </label>
                        <span className='ml-2 mb-6'>{historial_medico?.pregunta?.respuesta4 || 'Ninguno'}</span>
                    </div>
                    <div className='flex text-sm flex-col border-2 p-4 col-span-2'>
                        <label className='border-b-2 font-serif font-bold text-center mb-2 '>
                            ¿Ha padecido o padece alguna de las siguientes enfermedades?
                        </label>
                        {/* {
                            enfermedades ? (
                                enfermedades.map((enfermedad, index) => (
                                    <span key={index} className='ml-2 mb-6'>{enfermedad.nombre_enfermedad}</span>
                                ))
                            ) :
                                (
                                    <span className='ml-2 mb-6'>Ninguna</span>
                                )
                        } */}
                        <span className='ml-2 mb-6'>Ninguna</span>
                    </div>
                    <div className='flex text-sm flex-col border-2 p-4'>
                        <label className='border-b-2 font-serif font-bold  mb-5 text-center text-lg'>
                            Examenes extraoral
                        </label>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            Cabeza
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.examen_extraoral.examen_cabeza.nombre_cabeza}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            Cara
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.examen_extraoral.examen_cara.nombre_cara}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            ATM
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.examen_extraoral.examen_atm.nombre_atm}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            Ganglios
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.examen_extraoral.examen_ganglios.nombre_ganglios}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            Labios
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.examen_extraoral.examen_labios.nombre_labios}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            Señas particulares
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.examen_extraoral.examen_señasp.nombre_señasp}</span>
                    </div>
                    <div className='flex text-sm flex-col border-2 p-4'>
                        <label className='border-b-2 font-serif font-bold  mb-5 text-center text-lg'>
                            Examenes intraoral
                        </label>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            Encía
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.examen_intraoral.encia.nombre_encia}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            Lengua
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.examen_intraoral.lengua.nombre_lengua}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            Paladar duro
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.examen_intraoral.paladar_duro.nombre_paladard}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            Paladar blando
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.examen_intraoral.paladar_blando.nombre_paladarb}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            Faringe
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.examen_intraoral.faringe}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                            Piso de la boca
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.examen_intraoral.piso_boca.nombre_boca}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                        Reborde residua
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.examen_intraoral.reborde.nombre_reborde}</span>
                        <label className='border-b-2 font-serif font-bold  mb-2'>
                        Tipo de oclusión
                        </label>
                        <span className='ml-2 mb-2'>{historial_medico?.examen_intraoral.oclusion.nombre_oclusion}</span>
                    </div>
                </div>
            </div>
        </div>

    )
}
