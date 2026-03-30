import {Router} from 'express';
const routes = Router();
import categoriaRoutes from './categoriaRoutes';

routes.use('/categorias', categoriaRoutes);

export default routes;