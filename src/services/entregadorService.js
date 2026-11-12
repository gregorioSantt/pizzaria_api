import db from '../db/db.js';
import bcrypt from 'bcrypt';

export const findAll = async (idEntregador, nomeEntregador, telefone) => {
  let sql = 'SELECT * FROM entregador';

  const conditions = [];
  const values = [];

  if (idEntregador) {
    conditions.push('idEntregador = ?');
    values.push(idEntregador);
  }

  if (nomeEntregador) {
    conditions.push('LOWER(nomeEntregador) LIKE ?');
    values.push(`%${nomeEntregador.toLowerCase()}%`);
  }

  if (telefone) {
    conditions.push('telefone = ?');
    values.push(telefone);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  const [rows] = await db.query(sql, values);

  return rows;
};


export const create = async (newEntregadorData) => {

    const newEntregador = {
        ...newEntregadorData
    };

    const [result] = await db.query(
        'INSERT INTO entregador SET ?',
        newEntregador
    );

    return {
        idEntregador: result.insertId,
        ...newEntregador
    };
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