import { axiosInstance } from '../helpers/axios-confit';

const getMarcas =() => {
    return axiosInstance.get('marcas', {
       
        headers: {
            'content-type': 'application/json'

        }
    });
}

const crearMarca = (data) => {
    return axiosInstance.post('marcas', data, {
        headers: {
            'content-type': 'application/json'
        }
    });
}

const editarMarca = (marcaId, data) => {
    return axiosInstance.put(`marcas/${marcaId}`, data, {
        headers: {
            'content-type': 'application/json'
        }
    });
}

const getMarcasPorId =(marcasId) => {
    return axiosInstance.get(`marcas/${marcasId}`, {
       
        headers: {
            'content-type': 'application/json'

        }
    });
}

export {
    getMarcas, crearMarca, editarMarca, getMarcasPorId
}