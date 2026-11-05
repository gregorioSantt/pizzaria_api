import * as pedidoService from '../services/pedidoService.js';
import Joi from 'joi';
 
export const pedidoCreateSchema = Joi.object({
  valorTotal: Joi.string().required(),
  formaPagto: Joi.string().required().max(10),
  statusPedido: Joi.string().required().max(15),
  formaEntrega: Joi.string().required().max(15),
  cpf: Joi.string().length(11).required(),
  idEntregador: Joi.string().required(),
});
 
export const pedidoUpdateSchema = Joi.object({
  valorTotal: Joi.string(),
  formaPagto: Joi.string().max(10),
  statusPedido: Joi.string().max(15),
  formaEntrega: Joi.string().max(15),
  cpf: Joi.string(),
  idEntregador: Joi.string(),
}).min(1);
 
export const listarPedidos = async (req, res) => {
    try {
      const {idPedido, formaPagto, statusPedido, cpf} = req.query;
      const pedido = await pedidoService.findAll(idPedido, formaPagto, statusPedido, cpf);
      res.json(pedido);
    } catch (err) {
      console.error('Erro ao buscar pedido:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
 
 
export const adicionarPedido = async (req, res) => {
  try {
    const novoPedido = await pedidoService.create(req.body);
    res.status(201).json({ message: 'Pedido adicionado com sucesso', data: novoPedido });
  } catch (err) {
    console.error('Erro ao adicionar pedido:', err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'idPedido já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro ao adicionar pedido' });
  }
};
 
export const atualizarPedido = async (req, res) => {
  try {
    const { idPedido } = req.params;
    const updated = await pedidoService.update(idPedido, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    res.status(200).json({ message: 'Pedido atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar pedido:', err);
    res.status(500).json({ error: 'Erro ao atualizar pedido' });
  }
};
 
export const deletarPedido = async (req, res) => {
  try {
    const { idPedido } = req.params;
    const deleted = await pedidoService.remove(idPedido);
    if (!deleted) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    res.status(200).json({ message: 'Pedido deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar pedido:', err);
    res.status(500).json({ error: 'Erro ao deletar pedido' });
  }
};