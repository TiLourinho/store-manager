const connection = require('./connection');

const getAll = async () => {
  try {
    const query = 'SELECT * FROM products';
    const [products] = await connection.execute(query);

    return products;
  } catch (error) {
    console.log(`ProductModel getAll: ${error.message}`);
    return process.exit(1);
  }
};

module.exports = {
  getAll,
};