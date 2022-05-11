const SalesModel = require('../models/SalesModel');
const { getSalesId, errorHandler, removeSales } = require('../utils/auxiliaryFunctions');
const { STATUS_NOT_FOUND } = require('../utils/statusCodes');

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