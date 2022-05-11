const SalesService = require('../services/SalesService');
const { STATUS_OK, STATUS_NOT_FOUND,
  STATUS_CREATED, STATUS_NO_CONTENT } = require('../utils/statusCodes');

const getAll = async (_req, res) => {
  const sales = await SalesService.getAll();

  return res.status(STATUS_OK).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sales = await SalesService.getById(id);

  if (!sales) {
    return res.status(STATUS_NOT_FOUND).json({ message: 'Sale not found' });
  }
  return res.status(STATUS_OK).json(sales);
};

const create = async (req, res) => {
  const attributes = req.body;
  const sales = await SalesService.create(attributes);

  return res.status(STATUS_CREATED).json(sales);
};

const update = async (req, res) => {
  const { id } = req.params;
  const attributes = req.body;

  const sales = await SalesService.update(id, attributes);

  return res.status(STATUS_OK).json(sales);
};

const remove = async (req, res) => {
  const { id } = req.params;
  await SalesService.remove(id);

  return res.status(STATUS_NO_CONTENT).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};