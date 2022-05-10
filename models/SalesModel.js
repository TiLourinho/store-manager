const connection = require('./connection');
const { formatSalesKeys } = require('../utils/auxiliaryFunctions');

const getAll = async () => {
  const query = `SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity FROM sales AS sa
    JOIN sales_products AS sp
    ON sp.sale_id = sa.id
    ORDER BY sp.sale_id, sp.product_id`;
  const [sales] = await connection.execute(query);

  const formattedSales = sales.map(formatSalesKeys);

  return formattedSales;
};

const getById = async (id) => {
  const query = `SELECT sa.date, sp.product_id, sp.quantity FROM sales AS sa
    JOIN sales_products AS sp
    ON sp.sale_id = sa.id
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id, sp.product_id`;
  const [sales] = await connection.execute(query, [id]);

  if (sales.length === 0) return null;

  const formattedSales = sales.map(formatSalesKeys);

  return formattedSales;
};

const create = async (id, productId, quantity) => {
  const query = `INSERT INTO sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`;
  await connection.execute(query, [id, productId, quantity]);
};

const update = async (id, productId, quantity) => {
  const query = `UPDATE sales_products
    SET quantity = ?
    WHERE sale_id = ? AND product_id = ?`;
  await connection.execute(query, [quantity, id, productId]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};