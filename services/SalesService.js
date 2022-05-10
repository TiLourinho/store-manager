const SalesModel = require('../models/SalesModel');
const { getSalesId } = require('../utils/auxiliaryFunctions');

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
  await getById(id);
  
  await Promise.all(sales
    .map((elem) => SalesModel.update(id, elem.productId, elem.quantity)));

  const registeredSales = { saleId: id, itemUpdated: sales };

  return registeredSales;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};