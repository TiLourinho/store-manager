const SalesModel = require('../models/SalesModel');

const getAll = async () => {
  try {
    const sales = await SalesModel.getAll();

    return sales;
  } catch (error) {
    console.log(`SalesService getAll: ${error}`);
    return process.exit(1);
  }
};

const getById = async (id) => {
  try {
    const sales = await SalesModel.getById(id);

    if (!sales) {
      return null;
    }
    return sales;
  } catch (error) {
    console.log(`SalesService getById: ${error}`);
    return process.exit(1);
  }
};

module.exports = {
  getAll,
  getById,
};