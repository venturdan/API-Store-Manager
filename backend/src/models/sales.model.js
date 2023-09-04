const databaseConnection = require('./connection');

const findAll = async () => {
  const [sales] = await databaseConnection.execute(
    `SELECT sale_id AS saleId, date, product_id AS productId, quantity FROM sales_products 
    INNER JOIN sales AS s
    ON s.id = sale_id 
    ORDER BY sale_id, product_id`,
  );
  return sales;
};

const findByID = async (saleId) => {
  const [sale] = await databaseConnection.execute(
    `SELECT date, product_id AS productId, quantity FROM sales_products 
    INNER JOIN sales s
    ON s.id = sale_id 
    WHERE id = ?
    ORDER BY product_id;`,
    [saleId],
  );
  return sale;
};

const createSaleEntry = async () => {
  const [{ insertId }] = await databaseConnection.execute(
    'INSERT INTO sales () VALUES ()',
  );

  return insertId;
};

const createSaleWithProducts = async (products) => {
  const saleId = await createSaleEntry();
  const saleProducts = products.map(({ productId, quantity }) =>
    databaseConnection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleId, productId, quantity],
    ));
  await Promise.all(saleProducts);
  return saleId;
};

const removeSale = async (saleId) => {
  const [{ affectedRows }] = await databaseConnection
    .execute('DELETE FROM sales WHERE id = ?', [saleId]);
  return affectedRows;
};

module.exports = {
  findAll,
  findByID,
  createSaleWithProducts,
  removeSale,
};