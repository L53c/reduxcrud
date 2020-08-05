import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR
} from '../types/';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';
// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());
        try {
            // Insertar en la API
            await clienteAxios.post('/productos', producto);
            // Si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto));
            // Alerta success
            Swal.fire({
                title: 'Correcto',
                text: 'El producto se agregó correctamente',
                icon: 'success',
                timer: 1500
            })
        } catch (error) {
            console.log(error);
            // Si hay un error cambiar el state
            dispatch(agregarProductoError(true));
            // Alerta error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Intenta de nuevo',
                timer: 1500
            })
        }
    }
}
// payload es la parte que va a modificar los datos, el state
const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})
// Si el producto se guarda en la base y si hubo un error
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})
// Si hubo un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

// Función que descarga los productos de la base de datos
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch(descargarProductos());
        try {
            // setTimeout( async () => {
            //     const respuesta = await clienteAxios.get('/productos');
            //     dispatch( descargaProductosExitosa(respuesta.data) ) 
            // }, 1800);
            const respuesta = await clienteAxios.get('/productos');
            dispatch( descargaProductosExitosa(respuesta.data) ) 
        } catch (error) {
            console.log(error);
            dispatch(descargarProductosError());
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargarProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

// Selecciona y elimina el producto
export function borrarProductoAction(id){
    return async dispatch => {
        dispatch(obtenerProductoEliminar(id));
        try {
            const resultado = await clienteAxios.delete(`/productos/${id}`);
            dispatch( eliminarProductoExito() );
            // Si se elimina mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El producto se eliminó correctamente.',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch( eliminarProductoError() );
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});
const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});
const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});
// Colocar producto en edición
export function obtenerProductoEditar(producto){
    return (dispatch) => {
        dispatch( obtenerProductoAction(producto))
    }
}

const obtenerProductoAction = producto => ({
    type:OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Edita un registro en la API y state
export function editarProducto(producto) {
    return (dispatch) => {
        dispatch( editarProducto(producto))
    }
}