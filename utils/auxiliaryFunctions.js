const connection = require('../models/connection');

const formatSalesKeys = (salesData) => ({
  saleId: salesData.sale_id,
  date: salesData.date,
  productId: salesData.product_id,
  quantity: salesData.quantity,
});

const errorHandler = (status, message) => ({
  status,
  message,
});

const getByName = async (name) => {
  const query = 'SELECT * FROM products WHERE name = ?';
  const [product] = await connection.execute(query, [name]);

  if (product.length === 0) return null;

  return product[0];
};

const getSalesId = async () => {
  const query = 'INSERT INTO sales (date) VALUES (NOW())';
  const [sales] = await connection.execute(query);

  const salesId = sales.insertId;

  return salesId;
};

const removeSales = async (id) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  const [sales] = await connection.execute(query, [id]);

  return sales;
};

const stockEntry = async (id, quantity) => { 
  const query = `UPDATE products
    SET quantity = quantity + ?
    WHERE id = ?`;
  const stock = await connection.execute(query, [quantity, id]);

  return stock;
};

const stockOut = async (id, quantity) => {
  const query = `UPDATE products
    SET quantity = quantity - ?
    WHERE id = ?`;
  const stock = await connection.execute(query, [quantity, id]);

  return stock;
};

const stockQuantity = async (id) => {
  const query = `SELECT product_id AS productId, quantity
    FROM sales_products WHERE sale_id = ?`;
  const [stock] = await connection.execute(query, [id]);

  return stock;
};

module.exports = {
  formatSalesKeys,
  errorHandler,
  getByName,
  getSalesId,
  removeSales,
  stockEntry,
  stockOut,
  stockQuantity,
};