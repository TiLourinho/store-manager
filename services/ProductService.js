const ProductModel = require('../models/ProductModel');

const getAll = async () => {
  const products = await ProductModel.getAll();

  return products;
};

module.exports = {
  getAll,
};