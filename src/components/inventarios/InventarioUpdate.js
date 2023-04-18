import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getInventarioPorId, editarInvetario} from '../../services/inventarioService';
import { getUsuarios } from '../../services/usuarioService';
import { getMarcas } from '../../services/marcaService';
import { getTiposEquipos } from '../../services/tipoEquipoService';
import { getEstadosEquipos } from '../../services/estadoEquipo';
import Swal from 'sweetalert2';

export const InventarioUpdate = () => {

    const { inventarioId = '' } = useParams();
    const [ inventario, setInventario ] = useState ({});
    const [ valoresForm, setValoresForm ] = useState ({});
    const [ usuarios, setUsuarios ] = useState([]);
    const [ marcas, setMarcas ] = useState([]);
    const [ tipos, setTipos ] = useState([]);
    const [ estadosEquipos, setEstadosEquipos ] = useState([]);

    const { serial = '', modelo = '', descripcion = '', color = '', foto = '', 
         fechaCompra = '', precio = '', usuario, marca, tipoEquipo, estadoEquipo } = valoresForm;

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

        
        const listarTiposEquipos = async () => {
            try {
                const { data } = await getTiposEquipos();
                setTipos(data);
            } catch (error) {
                console.log(error);
            }
        }    
        useEffect(() => {
            listarTiposEquipos();
        }, []);

    const getInventario = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text:'Cargando...'
              });
            const { data } = await getInventarioPorId(inventarioId);
            console.log(data);
            setInventario(data)
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        getInventario();
    }, [ inventarioId ]);

    useEffect(() => {
            setValoresForm({
                serial: inventario.serial,
                modelo: inventario.modelo,
                descripcion: inventario.descripcion,
                color: inventario.color,
                foto: inventario.foto,
                fechaCompra: inventario.fechaCompra,
                precio: inventario.precio,
                usuario: inventario.usuario,
                marca: inventario.marca,
                tipoEquipo: inventario.tipoEquipo,
                estadoEquipo: inventario.estadoEquipo,
            });
    }, [inventario]);


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
            
            estadoEquipo: {
                _id: estadoEquipo
            },

            tipoEquipo: {
                _id: tipoEquipo
            },
         }
         
         try {
            Swal.fire({
              allowOutsideClick: false,
              text:'Cargando...'
            });
            Swal.showLoading();
              const { data } = await editarInvetario( inventarioId, inventario);
              console.log(data);
              Swal.close();
       } catch (error) {
          console.log(error);
          console.log(error.response.data)
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
    <div className='container-fluid mt-3 mb-2'>
        <div className='card'>
            <div className='card-header'>
                <h5 className='card-title'>Detalle activo</h5>
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-4'>
                        <img src={inventario?.foto} />
                    </div>
                    <div className='col-md-8'>
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
                                            tipos.map(({_id, nombre }) => {
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
            </div>
        </div>

    </div>
  )
}
