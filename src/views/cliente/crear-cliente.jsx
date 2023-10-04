import { createRef,useState } from 'react';

export default function Crearcliente() {
    const ididentificacion = createRef();
    const identificacion_cliente = createRef();

    

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const datos = {
            ididentificacion: ididentificacion.current.value,
            identificacion_cliente: identificacion_cliente.current.value,
        };
        console.log(datos);
        // Procesa los datos del formulario (por ejemplo, enviar a un servidor)
        
    };

    // const identificacionValidation = () => {
    //     if (formData.identificacion_cliente !== '') {
    //         switch (formData.ididentificacion) {
    //             case '1':
    //                 return formData.identificacion_cliente.length <= 10 && formData.identificacion_cliente.length > 9 && /^[0-9]*$/.test(formData.identificacion_cliente);
    //             case '2':
    //                 return formData.identificacion_cliente.length <= 13 && formData.identificacion_cliente.length > 12 && /^[0-9]*$/.test(formData.identificacion_cliente);
    //             case '3':
    //                 return formData.identificacion_cliente.length <= 9;
    //             default:
    //                 return true;
    //         }
    //     }else{
    //         return true;
    //     }
    // };

    return (
        <form onSubmit={handleFormSubmit} className="p-4">
            <div className="mb-4">
                <label htmlFor="ididentificacion" className="block mb-2">Identificación:</label>
                <select
                    id="ididentificacion"
                    name="ididentificacion"
                    className="w-full px-3 py-2 border rounded-md"
                    ref={ididentificacion}
                >
                    <option value="1">Cédula</option>
                    <option value="2">RUC</option>
                    <option value="3">Pasaporte</option>
                </select>
            </div>
            {/* ... otros campos del formulario ... */}
            <div className="mb-4">
                <label htmlFor="identificacion_cliente" className="block mb-2">Número de Identificación:</label>
                <input
                    type="text"
                    id="identificacion_cliente"
                    name="identificacion_cliente"
                    className={`w-full px-3 py-2 border rounded-md `}
                    // ${identificacionValidation() ? '' : 'border-red-500'}
                    ref={identificacion_cliente}
                />
                {/* {!identificacionValidation() && <span className="text-red-500 text-sm">Formato de identificación inválido.</span>} */}
            </div>
            {/* ... otros campos del formulario ... */}
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Enviar</button>
        </form>
    )
}
