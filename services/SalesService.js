const SalesModel = require('../models/SalesModel');

const getAll = async () => {
  try {
    const sales = await SalesModel.getAll();

    return sales;
  } catch (error) {
    console.log(`ServiceModel getAll: ${error}`);
    return process.exit(1);
  }
};

module.exports = {
  getAll,
};