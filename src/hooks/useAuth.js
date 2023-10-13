import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";


export const useAuth = ({ middleware, url }) => {
    
    const navigate = useNavigate();

    const login = async (datos) => {
        try {
            console.log(datos);
            const { data } = await clienteAxios.post('api/login', datos);
            // const { data } = await clienteAxios.post('api/login', datos);
            // console.log(data);
            // setErrores([]);
            // await mutate()
        } catch (error) {
            console.log(error);
            // setErrores(Object.values(error.response.data.errors));
        }

    }	
    return {
        login
    }
}