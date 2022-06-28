import MongoDB from "../DAOs/DAOMongoDB.js";
import { logger, loggerError } from "../utils/logger.js";



const administrador = true;

class ControllerProductos{
    productosFormGET = async ctx=>{
        logger.info(`ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        try {
            ctx.body = {
                productos: await MongoDB.productos.getAll()
            };
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        }
    }

    productosGET = async ctx => {
        logger.info(`ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        try {
            if (ctx.params.id === undefined) {
                ctx.body = {
                    productos: await MongoDB.productos.getAll()
                };
            }else{
                ctx.body = {
                    producto: await MongoDB.productos.getById(ctx.params.id)
                } 
            } 
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        }
    }

    productosPOST = async ctx => {
        logger.info(`ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        try{
            if(administrador){
            
                await MongoDB.productos.save({
                    timestamp: Date.now(),
                    nombre: ctx.request.body.nombre,
                    descripcion: ctx.request.body.descripcion,
                    codigo: ctx.request.body.codigo,
                    foto: ctx.request.body.urlFoto,
                    precio: ctx.request.body.precio,
                    stock: ctx.request.body.stock
                });
    
                ctx.redirect.redirect('/')
                
            }else{
                loggerError.error(`${error} - Hubo un error en ruta ${ctx.request.url} metodo ${ctx.request.method} implementada - Ruta no autorizada`)
                ctx.response.render('error-notif', {errorMsg: {error: '-1', descripcion: `ruta ${ctx.request.url} metodo ${ctx.request.method} no autorizada`}});
            }
        }catch(error){
            loggerError.error(`${error} - Hubo un error en ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`);
        }
    }

    productosPUT = async ctx => {
        logger.info(`ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        try {
            if(administrador){
                ctx.body = {
                    mensaje: await MongoDB.productos.updateById(ctx.params.id, ctx.query)
                } 
            }else{
                loggerError.error(`${error} - Hubo un error en ruta ${ctx.request.url} metodo ${ctx.request.method} implementada - Ruta no autorizada`)
                ctx.body = {errorMsg: {error: '-1', descripcion: `ruta ${ctx.request.url} metodo ${ctx.request.method} no autorizada`}};
            }
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        }
    }

    productosDELETE = async ctx => {
        logger.info(`ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        try {
            if(administrador){
                ctx.body = {
                   mensaje:  await MongoDB.productos.deleteById(ctx.params.id)
                }  
            } else {
                loggerError.error(`${error} - Hubo un error en ruta ${ctx.request.url} metodo ${ctx.request.method} implementada - Ruta no autorizada`)
                ctx.body = {errorMsg: {error: '-1', descripcion: `ruta ${ctx.request.url} metodo ${ctx.request.method} no autorizada`}}
            }
        } catch (error) {
            loggerError.error(`${error} - Hubo un error en ruta ${ctx.request.url} metodo ${ctx.request.method} implementada`)
        }
    }
}

export default ControllerProductos;