import React, { useState } from 'react'
import useDental from '../hooks/useDental';
import { FaTimes } from 'react-icons/fa';
import { PiTooth } from "react-icons/pi";
import useSWR from 'swr'
import clienteAxios from '../config/axios';
import { useNavigate } from "react-router-dom";
import MiniSpinner from './MiniSpiner';
export default function ModalDiente() {
  const navigate = useNavigate();
  const { handleErrorSweet, handleIngresarDatos, handleRedireccionar } = useDental();
  const fetcher = () => clienteAxios('api/tratamientos_dentales').then(datos => datos.data)
  const { data: tratamientosDatos, isLoading: isLodingTratamiento } = useSWR('api/tratamientos_dentales', fetcher)
  const fetchercondiones = () => clienteAxios('api/condiciones_dentales').then(datos => datos.data)
  const { data: condicionesDatos, isLoading: isLodingCondicion } = useSWR('api/condiciones_dentales', fetchercondiones)
  const { datosActual, handleClickModal } = useDental();
  const tratamientos = tratamientosDatos?.data;
  const condiciones = condicionesDatos?.data;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCondicion, setSelectedCondicion] = useState('');

  const handleCondicionChange = (condicion) => {
    setSelectedCondicion(condicion);
    setDropdownOpen(false);
  };

  const handleEnviarOdonto = (e) => {    

    e.preventDefault();
    
    const data = new FormData(e.target);
    
    if (!data.get('tratamiento') || (selectedCondicion === '' && !datosActual.idcondicionesd)) {
      handleErrorSweet('Debe seleccionar un tratamiento y una condición');
      return;
    }

    const datos = {
      iddiente: datosActual.idHistorial,
      idposiciond: datosActual.idposiciond,
      idubicaciond: datosActual.idubicacion,
      idcondicionesd: selectedCondicion ? selectedCondicion : datosActual.idcondicionesd,
      idtratamientos: data.get('tratamiento'),
      nombre_diente: datosActual.nombre_diente,
      descripcion_diente: data.get('descripcion') != null || data.get('descripcion') != '' ? data.get('descripcion') : '',
      idhistorial: datosActual.idHistorial,
    }

    handleIngresarDatos(datos, 'api/dientes');

    setTimeout(() => {
      window.location.reload();
    }, 2000);

  }

  return (
    <div className='p-4 overflow-visible'>

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
            <div className='mb-3'>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tratamientos: <span className="text-red-500">*</span>
                </label>
                {
                  isLodingTratamiento ? <MiniSpinner /> :
                    <select name="tratamiento" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={datosActual?.idtratamientos}>
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
                  defaultValue={datosActual?.descripcion_diente}
                  name="descripcion"
                  rows="3"
                  placeholder="Descripción del tratamiento"
                ></textarea>
              </div>
            </div>
            <div>
              <div className='gap-4 mt-2 flex flex-col'>
                <label className="block text-gray-700 text-sm font-bold">
                  Condiciones: <span className="text-red-500">*</span>
                </label>
                {
                  isLodingCondicion ? <MiniSpinner /> :
                    <div className="relative w-full text-gray-700">
                      <div className="shadow border rounded w-full py-2 px-3 flex justify-between items-center text-gray-700 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <span>
                          {selectedCondicion ? condiciones.find(c => c.idcondicionesd === selectedCondicion).nombre_condicion : (datosActual?.idcondicionesd ? condiciones.find(c => c.idcondicionesd === datosActual?.idcondicionesd).nombre_condicion : '--Selecciona--')}
                        </span>
                        {(selectedCondicion || datosActual.idcondicionesd) && (
                          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: condiciones.find(c => c.idcondicionesd === (selectedCondicion ? selectedCondicion : datosActual?.idcondicionesd)).color_condicion }}>
                          </div>
                        )}
                      </div>
                      {dropdownOpen && (
                        <div className="absolute bg-white border mt-2 rounded w-full z-10 max-h-32 overflow-y-scroll">
                          {condiciones.map(condicion => (
                            <div
                              key={condicion.idcondicionesd}
                              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                              onClick={() => handleCondicionChange(condicion.idcondicionesd)}
                            >
                              <div className="h-4 w-4 mr-2 rounded-full" style={{ backgroundColor: condicion.color_condicion }}>
                              </div>
                              {condicion.nombre_condicion}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className='flex-1 flex justify-center gap-14 mt-8'>
          <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded flex items-center mt-4">
            <span className="mr-2">{datosActual?.datosDiente ? 'Guardar Cambios' : 'Guardar'}</span>
          </button>
          {datosActual?.datosDiente && (
            // boton para eliminar el diente
            <button type="button" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center mt-4">
              <span className="mr-2">Eliminar</span>
            </button>
          )
          }
          <button type="button" onClick={handleClickModal} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center mt-4">
            <span className="mr-2">Cancelar</span>
          </button>
        </div>
      </form>
    </div>
  )
}
