import koa from 'koa';
import carrito from './src/routes/carritos.routes.js';
import productos from './src/routes/productos.routes.js';
import koaBody from 'koa-body';
import { logger, loggerError } from './src/utils/logger.js'

const app = new koa();

app.use(koaBody())

app.use(productos.routes())
app.use(carrito.routes())

const PORT = 8080;

const server = app.listen(PORT, () => {
   logger.info(`Servidor escuchando en el puerto ${server.address().port}`);
});

server.on("error", error => loggerError.error(error, `Error en servidor ${error}`) ); 