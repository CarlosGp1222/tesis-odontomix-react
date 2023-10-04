class DatabaseSimulator {
    constructor() {
        // Datos iniciales simulados
        this.data = [
            {
                id: 1,
                nombres_cliente: 'Carlos José',
                apellidos_cliente: 'González Parrales',
                ididentificacion: '1',
                identificacion_cliente: '1234567890',
                genero_cliente: 'Masculino',
                edad_cliente: '30',
                telefono_cliente: '0987654321',
                correo_cliente: 'juan.perez@example.com'
            },
            // Puedes agregar más datos iniciales si lo deseas
        ];
    }

    // Obtener todos los clientes
    getAllClientes() {
        return this.data;
    }

    // Agregar un nuevo cliente
    addCliente(cliente) {
        const newId = this.data.length > 0 ? this.data[this.data.length - 1].id + 1 : 1;
        const newCliente = {
            id: newId,
            ...cliente
        };
        this.data.push(newCliente);
        return newCliente;
    }

    // Obtener un cliente por su ID
    getClienteById(id) {
        return this.data.find(cliente => cliente.id === id);
    }

    // Eliminar un cliente por su ID
    deleteClienteById(id) {
        const index = this.data.findIndex(cliente => cliente.id === id);
        if (index !== -1) {
            this.data.splice(index, 1);
        }
    }
}

export default DatabaseSimulator;
