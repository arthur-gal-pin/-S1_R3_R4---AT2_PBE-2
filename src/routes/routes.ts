import {Router} from 'express';
const routes = Router();
import categoriaRoutes from './categoriaRoutes';
import produtoRoutes from './produtoRoutes';

routes.use('/categorias', categoriaRoutes);
routes.use('/produtos', produtoRoutes);

export default routes;