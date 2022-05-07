const connection = require('./connection');
const { formatSalesKeys } = require('../utils/auxiliaryFunctions');

const getAll = async () => {
  try {
    const query = `SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity FROM sales_products AS sp
      JOIN sales AS sa
      ON sp.product_id = sa.id
      ORDER BY sp.sale_id, sp.product_id`;
    const [sales] = await connection.execute(query);

    const formattedSales = sales.map(formatSalesKeys);

    return formattedSales;
  } catch (error) {
    console.log(`SaleModel getAll: ${error}`);
    return process.exit(1);
  }
};

module.exports = {
  getAll,
};