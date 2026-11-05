import db from '../db/db.js';
 
export const findAll = async (idPedido, formaPagto, statusPedido, cpf) => {
  let sql = 'SELECT * FROM pedido';
  const conditions = [];
  const values = [];
 
  if (cpf) {
    conditions.push('cpf = ?');
    values.push(cpf);
  }
 
  if (formaPagto) {
    conditions.push('formaPagto = ?');
    values.push(formaPagto);
  }
 
  if (statusPedido) {
    conditions.push('LOWER(statusPedido) LIKE ?');
    values.push(`%${statusPedido.toLowerCase()}%`);
  }
 
  if (idPedido) {
    conditions.push('idPedido = ?');
    values.push(idPedido);
  }
 
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
 
  const [rows] = await db.query(sql, values);
  return rows;
 
};
 
export const create = async (newPedido) => {
 
  await db.query('INSERT INTO pedido SET ?', newPedido);
 
  return newPedido;
};
 
export const update = async (idPedido, newPedido) => {
 
  const [result] = await db.query('UPDATE pedido SET ? WHERE idPedido = ?', [newPedido, idPedido]);
  return result.affectedRows > 0;
};
 
export const remove = async (idPedido) => {
  const [result] = await db.query('DELETE FROM pedido WHERE idPedido = ?', [idPedido]);
  return result.affectedRows > 0;
};