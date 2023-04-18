import { axiosInstance } from '../helpers/axios-confit';

const getEstadosEquipos =() => {
    return axiosInstance.get('estadoEquipo', {  
        headers: {
            'content-type': 'application/json'

        }
    });
}

const crearEstadosEquipos = (data) => {
    return axiosInstance.post('estadoEquipo', data,{
        headers: {
            'content-type': 'application/json'
        }
    });
}

const editarEstadosEquipos = (estadoEquipoId, data) => {
    return axiosInstance.put(`estadoEquipo/${estadoEquipoId}`, data, {
        headers: {
            'content-type': 'application/json'
        }
    });
}

const getEstadosEquiposPorId =(estadoEquipoId) => {
    return axiosInstance.get(`estadoEquipo/${estadoEquipoId}`, {
       
        headers: {
            'content-type': 'application/json'

        }
    });
}

export {
    getEstadosEquipos, crearEstadosEquipos, editarEstadosEquipos, getEstadosEquiposPorId
}