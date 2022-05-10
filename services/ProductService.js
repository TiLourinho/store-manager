const ProductModel = require('../models/ProductModel');
const { errorHandler, getByName } = require('../utils/auxiliaryFunctions');
const { STATUS_CONFLICT, STATUS_NOT_FOUND } = require('../utils/statusCodes');

const getAll = async () => {
  const products = await ProductModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await ProductModel.getById(id);

  if (!product) {
    return null;
  }
  return product;
};

const create = async (name, quantity) => {
  const checkProduct = await getByName(name);

  if (checkProduct) {
    throw errorHandler(STATUS_CONFLICT, 'Product already exists');
  }

  const product = await ProductModel.create(name, quantity);

  return product;
};

const update = async (name, quantity, id) => {
  const checkProduct = await ProductModel.getById(id);

  if (!checkProduct) {
    throw errorHandler(STATUS_NOT_FOUND, 'Product not found');
  }
  
  const product = await ProductModel.update(name, quantity, id);

  return product;
};

const remove = async (id) => {
  const checkProduct = await ProductModel.getById(id);

  if (!checkProduct) {
    throw errorHandler(STATUS_NOT_FOUND, 'Product not found');
  }

  const product = await ProductModel.remove(id);

  return product;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};