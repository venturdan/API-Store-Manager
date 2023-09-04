const databaseConnection = require('./connection');

const getAllProducts = async () => {
  const [products] = await databaseConnection.execute(
    'SELECT * FROM products ORDER BY id',
  );
  return products;
};

const productsId = async (productId) => {
  const [[product]] = await databaseConnection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  if (product === undefined) return false;
  return product;
};

const insertProduct = async (productName) => {
  const [{ insertId }] = await databaseConnection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [productName],
  );

  return insertId;
};

const updateProduct = async (id, name) => {
  const [{ productToUpdate }] = await databaseConnection
    .execute('UPDATE products SET name = ? WHERE id = ?', [name, id]);
  return productToUpdate;
};

const deleteProduct = async (id) => {
  const [{ productToDelete }] = await databaseConnection
    .execute('DELETE FROM products WHERE id = ?', [id]);
  return productToDelete;
};

const findProduct = async (name) => {
  const [product] = await databaseConnection.execute(`
  SELECT * FROM products WHERE name LIKE ?`, [`%${name}%`]);

  return product;
};

module.exports = {
  getAllProducts,
  productsId,
  insertProduct,
  updateProduct,
  deleteProduct,
  findProduct,
};