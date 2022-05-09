const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [products] = await connection.execute(query);

  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);

  if (product.length === 0) return null;

  return product[0];
};

const create = async (name, quantity) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';
  const [product] = await connection.execute(query, [name, quantity]);

  const registeredProduct = { id: product.insertId, name, quantity };

  return registeredProduct;
};

module.exports = {
  getAll,
  getById,
  create,
};