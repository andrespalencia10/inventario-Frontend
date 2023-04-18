import { axiosInstance } from '../helpers/axios-confit';

const getInventarios =() => {
    return axiosInstance.get('inventario', {
       
        headers: {
            'content-type': 'application/json'

        }
    });
}

const crearInventario = (data) => {
    return axiosInstance.post('inventario', data, {

        headers: {
            'content-type': 'application/json'
        }
    });
}

const editarInvetario = (inventarioId, data) => {
    return axiosInstance.put(`inventario/${inventarioId}`, data, {
        headers: {
            'content-type': 'application/json'
        }
    });
}

const getInventarioPorId =(inventarioId) => {
    return axiosInstance.get(`inventario/${inventarioId}`, {
       
        headers: {
            'content-type': 'application/json'

        }
    });
}

export {
    getInventarios, crearInventario, editarInvetario, getInventarioPorId
}