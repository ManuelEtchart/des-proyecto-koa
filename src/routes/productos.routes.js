import Router from 'koa-router'
import ControllerProductos from '../controllers/productos.controller.js';

const Productos = new ControllerProductos()

const productos = new Router({
    prefix: '/api/productos'
})

productos.get('/form', Productos.productosFormGET);

productos.get('/:id?', Productos.productosGET);

productos.post('', Productos.productosPOST);

productos.put('/:id', Productos.productosPUT)

productos.delete('/:id', Productos.productosDELETE)


export default productos