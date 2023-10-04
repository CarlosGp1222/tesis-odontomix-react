import React, { useState } from 'react';

export default function Crearcliente() {
    const [formData, setFormData] = useState({
        ididentificacion: 'cedula',
        nombres_cliente: '',
        apellidos_cliente: '',
        identificacion_cliente: '',
        genero_cliente: '',
        edad_cliente: '',
        telefono_cliente: '',
        correo_cliente: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Procesa los datos del formulario (por ejemplo, enviar a un servidor)
        console.log(formData);
    };

    const identificacionValidation = () => {
        if (formData.identificacion_cliente !== '') {
            switch (formData.ididentificacion) {
                case 'cedula':
                    return formData.identificacion_cliente.length <= 10 && formData.identificacion_cliente.length > 9 && /^[0-9]*$/.test(formData.identificacion_cliente);
                case 'ruc':
                    return formData.identificacion_cliente.length <= 13 && formData.identificacion_cliente.length > 12 && /^[0-9]*$/.test(formData.identificacion_cliente);
                case 'pasaporte':
                    return formData.identificacion_cliente.length <= 9;
                default:
                    return true;
            }
        }else{
            return true;
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="p-4">
            <div className="mb-4">
                <label htmlFor="ididentificacion" className="block mb-2">Identificación:</label>
                <select
                    id="ididentificacion"
                    name="ididentificacion"
                    value={formData.ididentificacion}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                >
                    <option value="cedula">Cédula</option>
                    <option value="ruc">RUC</option>
                    <option value="pasaporte">Pasaporte</option>
                </select>
            </div>
            {/* ... otros campos del formulario ... */}
            <div className="mb-4">
                <label htmlFor="identificacion_cliente" className="block mb-2">Número de Identificación:</label>
                <input
                    type="text"
                    id="identificacion_cliente"
                    name="identificacion_cliente"
                    value={formData.identificacion_cliente}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md ${identificacionValidation() ? '' : 'border-red-500'}`}
                />
                {!identificacionValidation() && <span className="text-red-500 text-sm">Formato de identificación inválido.</span>}
            </div>
            {/* ... otros campos del formulario ... */}
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">Enviar</button>
        </form>
    );
}
