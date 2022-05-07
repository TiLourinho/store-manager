const ProductService = require('../services/ProductService');
const { STATUS_OK, STATUS_NOT_FOUND } = require('../utils/statusCodes');

const getAll = async (req, res) => {
  const products = await ProductService.getAll();

  return res.status(STATUS_OK).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.getById(id);

  if (!product) {
    return res.status(STATUS_NOT_FOUND).json({ message: 'Product not found' });
  }
  return res.status(STATUS_OK).json(product);
};

module.exports = {
  getAll,
  getById,
};