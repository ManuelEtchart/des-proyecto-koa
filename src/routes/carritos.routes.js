import Router from 'koa-router'
import ControllerCarrito from '../controllers/carritos.controller.js'

const Carritos = new ControllerCarrito()

const carrito = new Router({
    prefix: '/api/carritos'
})

carrito.get('', Carritos.carritosGET)

carrito.post('', Carritos.carritoPOST)

carrito.delete('/:id', Carritos.carritoDELETE);

carrito.get('/:id?/productos', Carritos.carritoGET)

carrito.post('/:id/productos/:id_prod', Carritos.carritoProductoPOST)

carrito.get('/:id/pedir', Carritos.carritoPedirGET)

carrito.delete('/:id/productos/:id_prod', Carritos.carritoProductoDELETE)



export default carrito