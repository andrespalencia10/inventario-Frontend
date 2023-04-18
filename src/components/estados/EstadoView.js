import React, { useState, useEffect } from 'react';
import { getEstadosEquipos, crearEstadosEquipos, } from '../../services/estadoEquipo';
import { Link } from 'react-router-dom';

export const EstadoView = () => {

    const [ ValoresForm, setValoresForm ] = useState ({});
    const [estadoEquipo, setEstadoEquipo ] = useState ([]);
    const { nombre= '', estado= '', fechaCreacion= '' } = ValoresForm;

    const listarEstadosEquipo = async () => {
      try{
        const resp = await getEstadosEquipos();
        setEstadoEquipo(resp.data);
      }catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      listarEstadosEquipo();
    },[]);

    const handleOnChange = (e) => {
      setValoresForm({...ValoresForm, [e.target.name]: e.target.value});
    }

    const handleCrearEstadoEquipo = async (e) => {
      e.preventDefault();
      console.log(ValoresForm);
      try {
        const resp = await crearEstadosEquipos(ValoresForm);
        console.log(resp.data);
        setValoresForm({nombre: '' , estado: '' , fechaCreacion: ''});

      }catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="container-fluid">
      <form onSubmit={ (e) => handleCrearEstadoEquipo(e) } >
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input required name= 'nombre' value = {nombre} type="text" className="form-control" 
                onChange={ (e) => handleOnChange(e) }/>
            </div>
            <div className="mb-3">
            <label className="form-label">Estado</label>
                  <select required name= 'estado' value= {estado} className="form-select" 
                      onChange={ (e) => handleOnChange(e) }>
                    <option selected>--Seleccione--</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
              <div className="mb-3">
                    <label className="form-label">Fecha Creación</label>
                    <input required name= 'fechaCreacion' value = {fechaCreacion} type="date" className="form-control" 
                        onChange={ (e) => handleOnChange(e) }/>
              </div>  
            </div>
            
            <button className="btn btn-primary">Guardar</button>
          </form>

          <table className="table">
  <thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Estado</th>
      <th scope="col">fecha De Creación</th>
    </tr>
  </thead>
  <tbody>

      {
        estadoEquipo.map( estadoEquipo => {
          return <tr>
            <td>{estadoEquipo.nombre}</td>
            <td>{estadoEquipo.estado}</td>
            <td>{estadoEquipo.fechaCreacion}</td>
            <Link to={`estados/edit/${estadoEquipo._id}`}> <button className="btn btn-outline-secondary"> Editar </button> </Link>
            </tr>
        })
      }
  </tbody>
</table>
      </div>
  )
}