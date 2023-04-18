import React, { useState, useEffect } from 'react';
import { getUsuarios } from '../../services/usuarioService';
import { getMarcas } from '../../services/marcaService';
import { getTiposEquipos } from '../../services/tipoEquipoService';
import { getEstadosEquipos } from '../../services/estadoEquipo';
import { crearInventario } from '../../services/inventarioService';
import Swal from 'sweetalert2';

export const InventarioNew = ({ handleOpenModal, listarInventarios }) => {

    const [ usuarios, setUsuarios ] = useState([]);
    const [ marcas, setMarcas ] = useState([]);
    const [ tiposEquipos, setTiposEquipos ] = useState([]);
    const [ estadosEquipos, setEstadosEquipos ] = useState([]);
    const [ valoresForm, setValoresForm ] = useState ({});
    const { serial = '', modelo = '', descripcion = '', color = '', foto = '', 
         fechaCompra = '', precio = '', usuario, marca, tipoEquipo, estadoEquipo} = valoresForm;


    const listarUsuarios = async () => {
        try{
          const { data } = await getUsuarios();
          setUsuarios(data);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      } 
      useEffect(() => {
        listarUsuarios();
    }, []);

    const listarMarcas = async () => {
        try {
            const { data } = await getMarcas();
            setMarcas(data);
        }   catch (error) {
            console.log(error);
        }
    }    
    useEffect(() => {
        listarMarcas();
    }, []);

    const listarEstadosEquipos = async () => {
        try {
            const { data } = await getEstadosEquipos();
            setEstadosEquipos(data);
        } catch (error) {
            console.log(error);
        }
    }    
    useEffect(() => {
        listarEstadosEquipos();
    }, []);

    const listarTipoEquipos = async () => {
        try {
            const { data } = await getTiposEquipos();
            setTiposEquipos(data);
        } catch (error) {
            console.log(error);
        }
    }    
    useEffect(() => {
        listarTipoEquipos();
    }, []);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value}); // spread
    }

    const handleOnSubmit = async (e) => {
            e.preventDefault();
            const inventario = {
            serial, modelo, descripcion, color, foto, fechaCompra, precio,
            usuario: {
                _id: usuario
            },
            marca: {
                _id: marca
            },
            tipoEquipo: {
                id: tipoEquipo
            },
            estadoEquipo: {
                _id: estadoEquipo
            }
         }
         try {
              Swal.fire({
                allowOutsideClick: false,
                text:'Cargando...'
              });
              Swal.showLoading();
                const { data } = await crearInventario(inventario);
                console.log(data);
                Swal.close();
                handleOpenModal();
                listarInventarios();
         } catch (error) {
            console.log(error);
            Swal.close();
            let mensaje;
            if (error && error.response && error.response.data) {
              mensaje = error.response.data;
            } else {
              mensaje = 'Ocurrió un error, intente de nuevo';
            }
            Swal.fire('Error', mensaje, 'error');
         } 
    }

  return (
    <div className='sidebar'>
        <div className='contaniner-fluid'>
            <div className='row'>
                <div className='col'>
                    <div className='sidebar-header'>
                        <h3>Nuevo Inventario</h3>
                        <i className='fa-solid fa-xmark' onClick={ handleOpenModal }></i>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <hr/>
                </div>
            </div>
            <form onSubmit={(e) => handleOnSubmit(e)}> 
                <div className='row'>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Serial</label>
                            <input type="text" name='serial' 
                            required
                            value={serial} 
                            onChange={ (e) => handleOnChange(e)}
                            className="form-control" />
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Modelo</label>
                            <input type="text" name='modelo' 
                            required
                            value={modelo} 
                            onChange={ (e) => handleOnChange(e)}
                            className="form-control" />
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <input type="text" name='descripcion' 
                            required
                            value={descripcion} 
                            onChange={ (e) => handleOnChange(e)}
                            className="form-control" />
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Color</label>
                            <input type="text" name='color' 
                            required
                            value={color} 
                            onChange={ (e) => handleOnChange(e)}
                            className="form-control" />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Foto</label>
                            <input type="url" name='foto' 
                            required
                            value={foto} 
                            onChange={ (e) => handleOnChange(e)}
                            className="form-control" />
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Fecha Compra</label>
                            <input type="date" name='fechaCompra' 
                            required
                            value={fechaCompra} 
                            onChange={ (e) => handleOnChange(e)}
                            className="form-control" />
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Precio</label>
                            <input type="number" name='precio' 
                            required
                            value={precio} 
                            onChange={ (e) => handleOnChange(e)}
                            className="form-control" />
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Usario</label>
                            <select className="form-select"
                                required 
                                onChange={ (e) => handleOnChange(e)}
                                name='usuario' 
                                value={usuario}>
                                <option value= ""> --Seleccione--</option>
                            {
                                    usuarios.map(({_id, nombre }) => {
                                        return <option key={_id} value={_id}>
                                                {nombre}
                                            </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Marca</label>
                            <select className="form-select" 
                                required
                                onChange={ (e) => handleOnChange(e)}
                                name='marca'
                                value={marca}>
                                <option value= ""> --Seleccione--</option>
                            {
                                    marcas.map(({_id, nombre }) => {
                                        return <option key={_id} value={_id}>
                                                {nombre}
                                            </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Tipo Equipo</label>
                            <select className="form-select" 
                                required
                                onChange={ (e) => handleOnChange(e)}
                                name='tipoEquipo'
                                value={tipoEquipo}>
                                <option value= ""> --Seleccione--</option>
                            {
                                    tiposEquipos.map(({_id, nombre }) => {
                                        return <option key={_id} value={_id}>
                                                {nombre}
                                            </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Estado Equipo</label>
                            <select className="form-select" 
                                required
                                onChange={ (e) => handleOnChange(e)}
                                name='estadoEquipo'
                                value={estadoEquipo}>
                                <option value= ""> --Seleccione--</option>
                            {
                                    estadosEquipos.map(({_id, nombre }) => {
                                        return <option key={_id} value={_id}>
                                                {nombre}
                                            </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <button className='btn btn-secondary'>Guardar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}
