const SalesModel = require('../models/SalesModel');
const ProductModel = require('../models/ProductModel');
const { getSalesId, errorHandler,
  removeSales, stockEntry, stockOut, stockQuantity } = require('../utils/auxiliaryFunctions');
const { STATUS_NOT_FOUND, STATUS_UNPROCESSABLE_ENTITY } = require('../utils/statusCodes');

const getAll = async () => {
  const sales = await SalesModel.getAll();

  return sales;
};

const getById = async (id) => {
  const sales = await SalesModel.getById(id);

  if (!sales) {
    return null;
  }
  return sales;
};

const create = async (sales) => {
  const id = await getSalesId();
  
  await Promise.all(sales
    .map((elem) => SalesModel.create(id, elem.productId, elem.quantity)));
  
  await Promise.all(sales.map(async (elem) => {
    const product = await ProductModel.getById(elem.productId);
    
    if (elem.quantity > product.quantity) {
      throw errorHandler(STATUS_UNPROCESSABLE_ENTITY, 'Such amount is not permitted to sell');
    }
  }));
  
  await Promise.all(sales.map((item) => stockOut(item.productId, item.quantity)));

  const registeredSales = { id, itemsSold: sales };

  return registeredSales;
};

const update = async (id, sales) => {
  await Promise.all(sales
    .map((elem) => SalesModel.update(id, elem.productId, elem.quantity)));

  const registeredSales = { saleId: id, itemUpdated: sales };

  return registeredSales;
};

const remove = async (id) => {
  const checkId = await SalesModel.getById(id);

  if (!checkId) {
    throw errorHandler(STATUS_NOT_FOUND, 'Sale not found');
  }
  
  const quantity = await stockQuantity(id);
  await Promise.all(quantity.map((elem) => stockEntry(elem.productId, elem.quantity)));

  await removeSales(id);
  const sales = await SalesModel.remove(id);

  return sales;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};