import { axiosInstance } from '../helpers/axios-confit';

const getTiposEquipos = () => {
    return axiosInstance.get('tipoEquipo', {
       
        headers: {
            'content-type': 'application/json'

        }
    });
}

const crearTiposEquipos = (data) => {
    return axiosInstance.post('tipoEquipo', data, {
        headers: {
            'content-type': 'application/json'
        }
    });
}

const editarTiposEquipos = (tipoEquipoId, data) => {
    return axiosInstance.put(`tipoEquipo/${tipoEquipoId}`, data, {
        headers: {
            'content-type': 'application/json'
        }
    });
}

const getTiposEquiposporId =(tipoEquipoId) => {
    return axiosInstance.get(`tipoEquipo/${tipoEquipoId}`, {
       
        headers: {
            'content-type': 'application/json'

        }
    });
}

export {
    getTiposEquipos, crearTiposEquipos, editarTiposEquipos, getTiposEquiposporId
}