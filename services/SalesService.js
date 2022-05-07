const SalesModel = require('../models/SalesModel');

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

module.exports = {
  getAll,
  getById,
};