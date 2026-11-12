import express from 'express';
import * as entregadorController from '../controllers/entregadorController.js';
import validate from '../middlewares/validate.js';
import { entregadoresCreateSchema, entregadoresUpdateSchema } from '../controllers/entregadorController.js';
 
import authMiddleware from '../middlewares/authMiddlewares.js';
 
const router = express.Router();
 
router.post('/', validate(entregadoresCreateSchema), entregadorController.adicionarEntregador);
 
router.use(authMiddleware);
 
router.get('/', entregadorController.listarEntregadores);
 
router.put('/:idEntregador', validate(entregadoresUpdateSchema), entregadorController.atualizarEntregador);
 
router.delete('/:idEntregador', entregadorController.deletarEntregador);
export default router;
 