const SalesService = require('../services/SalesService');
const { STATUS_OK } = require('../utils/statusCodes');

const getAll = async (_req, res) => {
  const sales = await SalesService.getAll();

  return res.status(STATUS_OK).json(sales);
};

module.exports = {
  getAll,
};