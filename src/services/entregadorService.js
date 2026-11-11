import db from '../db/db.js';
import bcrypt from 'bcrypt';

export const findAll = async (nomeEntregador, telefone, idEntregador) => {
  // 1. Define a consulta SQL base
  let sql = 'SELECT * FROM entregador';
  // 2. Cria um array para as condições WHERE
  const conditions = [];
  // 3. Cria um array para os valores (para prevenir SQL Injection)
  const values = [];
  // 4. Adiciona as condições dinamicamente
  // Adicionamos o filtro de ID
  if (idEntregador) {
    conditions.push('idEntregador = ?');
    values.push(idEntregador);
  }
  // Adicionamos o filtro de nome
  if (nomeEntregador) {
    conditions.push('LOWER(nomeEntregador) LIKE ?');
    values.push(`%${nomeEntregador.toLowerCase()}%`);
  }
  // Adicionamos o filtro de telefone
  if (telefone) {
    conditions.push('telefone = ?');
    values.push(telefone);
  };
}


export const create = async (newEntregadorData) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newEntregadorData.senha, saltRounds);

  const newEntregador = {
    ...newEntregadorData,
    senha: hashedPassword,
    tipo: 'entregador',
  };

  await db.query('INSERT INTO entregador SET ?', newEntregador);

  delete newEntregador.senha;
  return newEntregador;
};

export const update = async (idEntregador, entregadorData) => {
  if (entregadorData.senha) {
    const saltRounds = 10;
    entregadorData.senha = await bcrypt.hash(entregadorData.senha, saltRounds);
  }
  const [result] = await db.query('UPDATE entregador SET ? WHERE idEntregador = ?', [entregadorData, idEntregador]);
  return result.affectedRows > 0;
};

export const remove = async (idEntregador) => {
  const [result] = await db.query('DELETE FROM entregador WHERE idEntregador = ?', [idEntregador]);
  return result.affectedRows > 0;
};