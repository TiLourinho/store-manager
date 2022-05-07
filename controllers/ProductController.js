const ProductService = require('../services/ProductService');
const { STATUS_OK } = require('../utils/statusCodes');

const getAll = async (req, res) => {
  const products = await ProductService.getAll();

  return res.status(STATUS_OK).json(products);
};

module.exports = {
  getAll,
};