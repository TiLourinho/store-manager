const ProductModel = require('../models/ProductModel');

const getAll = async () => {
  try {
    const products = await ProductModel.getAll();
  
    return products;
  } catch (error) {
    console.log(`ProductService getAll: ${error}`);
    return process.exit(1);
  }
};

const getById = async (id) => {
  try {
    const product = await ProductModel.getById(id);
  
    if (!product) {
      return null;
    }
    return product;
  } catch (error) {
    console.log(`ProductService getById: ${error}`);
    return process.exit(1);
  }
};

module.exports = {
  getAll,
  getById,
};