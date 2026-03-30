import { Router } from "express";
import produtoController from "../controllers/produto.controller";
import uploadImage from "../middlewares/uploadImage.middleware";

const produtoRoutes = Router();

produtoRoutes.get('/produtos', produtoController.listar);
produtoRoutes.post('/produtos', uploadImage, produtoController.criar);
produtoRoutes.put('/produtos', produtoController.atualizar);
produtoRoutes.delete('/produtos/:id', produtoController.deletar);

export default produtoRoutes;