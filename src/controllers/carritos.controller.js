import { logger, loggerError } from "../utils/logger.js"
import MongoDB from "../DAOs/DAOMongoDB.js"; 


class ControllerCarrito {
    carritosGET = async ctx=>{
        logger.info(`ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        try {
            ctx.body = {
                carritos: await MongoDB.carritos.getAll()
            } 
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        }
    }

    carritoPOST = async ctx => {
        logger.info(`ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        try {
            await MongoDB.carritos.save(
                {
                    timestamp: Date.now(),
                    productos: []
                }
            );
            ctx.redirect('/api/carrito')
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        }
    }

    carritoDELETE = async ctx => {
        logger.info(`ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        try {
            ctx.body = {
                mensaje: await MongoDB.carritos.deleteById(ctx.params.id)
            }
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        }
    }

    carritoGET = async ctx => {
        logger.info(`ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        try {
            if(ctx.params.id === undefined){
                ctx.body = {
                    carritos: await MongoDB.carritos.getAll()
                }
            }else{
                ctx.body = {
                    carrito: await MongoDB.carritos.getById(ctx.params.id)
                } 
            }
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        }
    }

    carritoProductoPOST = async ctx => {
        logger.info(`ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        try {
            await MongoDB.carritos.agregarProductoEnCarrito(ctx.params.id, ctx.params.id_prod)
            ctx.body = {carritos: await MongoDB.carritos.getById(ctx.params.id)}
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        }
    }

    carritoPedirGET = async ctx=>{
        logger.info(`ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        try {
            ctx.body = {pedido: await MongoDB.carritos.getById(ctx.params.id)}
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        }
    }

    carritoProductoDELETE = async ctx => {
        logger.info(`ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        try {
            ctx.body = {mensaje: await MongoDB.carritos.borrarProductoEnCarrito(ctx.params.id, ctx.params.id_prod)}
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        }
    }
}

export default ControllerCarrito;