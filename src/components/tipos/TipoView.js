import React, { useState, useEffect } from 'react';
import { getTiposEquipos, crearTiposEquipos } from '../../services/tipoEquipoService';
import { Link } from 'react-router-dom';

export const TipoView = () => {

    const [ ValoresForm, setValoresForm ] = useState ({});
    const [ tipoEquipo, setTipoEquipo ] = useState ([]);
    const { nombre= '', estado= '', fechaCreacion= '' } = ValoresForm;
    

    const listarTipoEquipo = async () => {
      try{
        const resp = await getTiposEquipos();
        setTipoEquipo(resp.data);
      }catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      listarTipoEquipo();
    },[]);

    const handleOnChange = (e) => {
      setValoresForm({...ValoresForm, [e.target.name]: e.target.value});
    }

    const handleCrearTipoEquipo = async (e) => {
      e.preventDefault();
      console.log(ValoresForm);
      try {
        const resp = await crearTiposEquipos(ValoresForm);
        console.log(resp.data);
        setValoresForm({nombre: '' , estado: '' , fechaCreacion: ''});

      }catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="container-fluid">
      <form onSubmit={ (e) => handleCrearTipoEquipo(e) } >
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
        tipoEquipo.map( tipoEquipo => {
          return <tr>
            <td>{tipoEquipo.nombre}</td>
            <td>{tipoEquipo.estado}</td>
            <td>{tipoEquipo.fechaCreacion}</td>
            <Link to={`tipos/edit/${tipoEquipo._id}`}> <button className="btn btn-outline-secondary"> Editar </button> </Link>
            </tr>
        })
      }
  </tbody>
</table>
      </div>
  )
}