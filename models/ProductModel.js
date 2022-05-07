const connection = require('./connection');

const getAll = async () => {
  try {
    const query = 'SELECT * FROM products';
    const [products] = await connection.execute(query);

    return products;
  } catch (error) {
    console.log(`ProductModel getAll: ${error}`);
    return process.exit(1);
  }
};

const getById = async (id) => {
  try {
    const query = 'SELECT * FROM products WHERE id = ?';
    const [product] = await connection.execute(query, [id]);

    if (product.length === 0) return null;

    return product[0];
  } catch (error) {
    console.log(`ProductModel getById: ${error}`);
    return process.exit(1);
  }
};

module.exports = {
  getAll,
  getById,
};