import React, { useState, useEffect } from 'react';
import { getMarcas, crearMarca,} from '../../services/marcaService';
import { Link } from 'react-router-dom'

export const MarcaView = () => {

    const [ ValoresForm, setValoresForm ] = useState ({});
    const [marcas, setMarcas ] = useState ([]);
    const { nombre= '', estado= '', fechaCreacion= '' } = ValoresForm;

    const listarMarcas = async () => {
      try{
        const resp = await getMarcas();
        setMarcas(resp.data);
      }catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      listarMarcas();
    },[]);

    const handleOnChange = (e) => {
      setValoresForm({...ValoresForm, [e.target.name]: e.target.value});
    }

    const handleCrearMarca = async (e) => {
      e.preventDefault();
      console.log(ValoresForm);
      try {
        const resp = await crearMarca(ValoresForm);
        console.log(resp.data);
        setValoresForm({nombre: '' , estado: '' , fechaCreacion: ''});

      }catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="container-fluid">
      <form onSubmit={ (e) => handleCrearMarca(e) } >
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
        marcas.map( marcas => {
          return <tr>
            <td>{marcas.nombre}</td>
            <td>{marcas.estado}</td>
            <td>{marcas.fechaCreacion}</td>
            <Link to={`marcas/edit/${marcas._id}/`}> <button className="btn btn-outline-secondary"> Editar </button> </Link>
            </tr>
        })
      }
  </tbody>
</table>
      </div>
  )
}
