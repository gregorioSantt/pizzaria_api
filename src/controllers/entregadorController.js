// src/entregadorController.js
//Usamos 'import * as' para agrupar todas as exportações do service.
import * as entregadorService from '../services/entregadorService.js';
import Joi from 'joi';

//Usando 'export const' para criar e exportar a função
//Criação dos Schemas que o validate irá usar para validar dados do usuário
export const entregadoresCreateSchema = Joi.object({
    nomeEntregador: Joi.string().required().max(50),
    telefone: Joi.number().integer().required(),
    
});
console.log(entregadoresCreateSchema.describe());

export const entregadoresUpdateSchema = Joi.object({
    nomeEntregador: Joi.string().max(50),
    telefone: Joi.number().integer(),
   
}).min(1);

export const listarEntregadores = async (req, res) => {
    try {
      // Capturamos os parâmetros de consulta da URL
      // ex: ?idEntregador=01234567890 / ?nomeEntregador=sandro / ?telefone=11987654321
      const { idEntregador, nomeEntregador, telefone } = req.query;
      // Passamos todos os filtros para o serviço
      const entregadores = await entregadorService.findAll(idEntregador, nomeEntregador, telefone);
    // Lista vazia é uma resposta válida: 200 com []
      res.json(entregadores);
    } catch (err) {
      console.error('Erro ao buscar entregador:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }

    
};


export const adicionarEntregador = async (req, res) => {
  try {
    const novoEntregador = await entregadorService.create(req.body);
    res.status(201).json({ message: 'Entregador adicionado com sucesso', data: novoEntregador });
  } catch (err) {
    console.error('Erro ao adicionar entregador:', err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'ID do entregador já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro ao adicionar entregador' });
  }
};

export const atualizarEntregador = async (req, res) => {
  try {
    const { idEntregador } = req.params;
    const updated = await entregadorService.update(idEntregador, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Entregador não encontrado' });
    }
    res.status(200).json({ message: 'Entregador atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar entregador:', err);
    res.status(500).json({ error: 'Erro ao atualizar entregador' });
  }
};

export const deletarEntregador = async (req, res) => {
  try {
    const { idEntregador } = req.params;
    const deleted = await entregadorService.remove(idEntregador);
    if (!deleted) {
      return res.status(404).json({ error: 'Entregador não encontrado' });
    }
    res.status(200).json({ message: 'Entregador deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar entregador:', err);
    res.status(500).json({ error: 'Erro ao deletar entregador' });
  }
};