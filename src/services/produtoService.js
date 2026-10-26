import db from '../db/db.js';

export const findAll = async (minValor, maxValor, nomeProduto, tipo, idProduto) => {
  // 1. Define a consulta SQL base
  let sql = 'SELECT * FROM produto';
  // 2. Cria um array para as condições WHERE
  const conditions = [];
  // 3. Cria um array para os valores (para prevenir SQL Injection)
  const values = [];
  // 4. Adiciona as condições dinamicamente
  //filtro de valor mínimo
  if (minValor){
    conditions.push('valor >= ?');
    values.push(minValor);
  }
  //filtro valor maximo
  if (maxValor){
    conditions.push('valor <= ?');
    values.push(maxValor);

  // 6. Executa a consulta final
  const [rows] = await db.query(sql, values);
  return rows;
};



};

export const update = async (minValor, maxValor, nomeProduto, tipo, idProduto) => {
  if (produtoData.senha) {
    const saltRounds = 10;
    produtoData.senha = await bcrypt.hash(produtoData.senha, saltRounds);
  }
  const [result] = await db.query('UPDATE produto SET ? WHERE id = ?', [produtoData, idProduto]);
  return result.affectedRows > 0;
};

export const remove = async (idProduto) => {
  const [result] = await db.query('DELETE FROM produto WHERE id = ?', [idProduto]);
  return result.affectedRows > 0;
};