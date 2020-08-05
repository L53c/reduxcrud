import React from 'react'
import { useDispatch, useSelector } from "react-redux";

const EditarProducto = () => {

    // Producto a editar
    const producto = useSelector(state => state.productos.productoeditar);
    if(!producto) return null;
    const { nombre, precio, id } = producto;

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weigth-bold">
                            Editar Nuevo Producto
                        </h2>
                        <form 

                        >
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre Producto</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="nombre-producto"
                                    placeholder="Nombre Producto"        
                                    name="edt-nombre" 
                                    value={nombre}
                                    />
                            </div>
                            <div className="form-group">
                                <label htmlFor="precio">Precio Producto</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="precio-producto"
                                    placeholder="Precio Producto"        
                                    name="edt-precio" 
                                    value={precio}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                >
                                GUARDAR CAMBIOS
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default EditarProducto;