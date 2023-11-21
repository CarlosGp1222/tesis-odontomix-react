import React from 'react'
import { MdOutlineContentPasteSearch } from "react-icons/md";
export default function odontograma() {
    return (
        <div>
            {/* buscador numero ficha co tailwind */}
            <div className='flex flex-col justify-center items-center p-4'>
                <label className="text-gray-600 text-3xl font-medium text-center font-serif mb-3" htmlFor="">Buscar por numero Ficha</label>


                <div className='flex justify-center items-center w-full'>
                    {/* input que solo acepte numero */}
                    <input className='w-1/2 border-2 border-gray-300 rounded-md p-2 mr-2' type="text" placeholder='Ingrese numero de ficha' />
                    {/* boton de buscar */}
                    <button ><MdOutlineContentPasteSearch className='w-7 h-8'/></button>
                </div>
            </div>
        </div>
    )
}
