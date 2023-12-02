import React from 'react'
import useDental from '../hooks/useDental';
import { FaTimes } from 'react-icons/fa';
import { PiTooth } from "react-icons/pi";
import Spinner from './Spinner';
import useSWR from 'swr'
import clienteAxios from '../config/axios';
import MiniSpinner from './MiniSpiner';
export default function ModalDiente() {
  const fetcher = () => clienteAxios('api/tratamientos_dentales').then(datos => datos.data)
  const { data: tratamientosDatos, isLoading: isLodingTratamiento } = useSWR('api/tratamientos_dentales', fetcher)
  const fetchercondiones = () => clienteAxios('api/condiciones_dentales').then(datos => datos.data)
  const { data: condicionesDatos, isLoading: isLodingCondicion } = useSWR('api/condiciones_dentales', fetchercondiones)
  const { datosActual, handleClickModal } = useDental();
  const tratamientos = tratamientosDatos?.data;
  const condiciones = condicionesDatos?.data;


  const handleEnviarOdonto = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const datos = {
      idposiciond: datosActual.idposiciond,
      numDiente: datosActual.numDiente,
      idtratamientosd: data.get('tratamiento'),
      descripcion: data.get('descripcion'),
      idcondicionesd: data.get('condicion'),
    }
    console.log(datos);
  }

  return (
    <div className='p-4'>
      <div>
        <button className="float-right focus:outline-none" onClick={handleClickModal}>
          <FaTimes size={24} />
        </button>
      </div>
      <form onSubmit={handleEnviarOdonto} >
        <div className="bg-white p-4 rounded grid grid-cols-2 gap-4">
          <div className='border-r flex items-center flex-col justify-center'>
            <h2 className="text-center text-2xl text-cyan-600 flex justify-center items-center gap-4"><PiTooth size={50} /> Diente #{datosActual.numDiente}</h2>
            <h2 className="text-center text-2xl text-cyan-600 flex justify-center items-center gap-4"><span className='font-bold '>Lado:</span> {datosActual.nombre_posiciond}</h2>
          </div>
          <div>
            <div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tratamientos: <span className="text-red-500">*</span>
                </label>
                {
                  isLodingTratamiento ? <MiniSpinner /> :
                    <select required name="tratamiento" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                      <option value="">--Selecciona--</option>
                      {tratamientos.map(tratamiento => (
                        <option key={tratamiento.idtratamientosd} value={tratamiento.idtratamientosd}>{tratamiento.nombre_tratamiento}</option>
                      ))}
                    </select>
                }
              </div>
            </div>
            <div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Descripccion: <span>(OPCIONAL)</span>
                </label>
                <textarea
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  name="descripcion"
                  rows="3"
                  placeholder="Descripción del tratamiento"
                ></textarea>
              </div>
            </div>
            <div>
              <div className='gap-4 flex mt-2 '>
                {
                  isLodingCondicion ? <MiniSpinner /> :
                    condiciones.map(condicion => (                      
                      <button type='button' key={condicion.idcondicionesd}
                        className={`p-3 rounded-md text-white bg-slate-600`}>
                        {condicion.nombre_condicion}
                      </button>
                    ))
                }
              </div>
            </div>
          </div>
        </div>
        <div className='flex-1 flex justify-center gap-14'>
          <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded flex items-center mt-4">
            <span className="mr-2">Guardar</span>
          </button>
          {/* bton de cancelar */}
          <button type="button" onClick={handleClickModal} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center mt-4">
            <span className="mr-2">Cancelar</span>
          </button>
        </div>
      </form>
    </div>
  )
}
