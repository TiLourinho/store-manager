const salesRouter = require('express').Router();

const SalesController = require('../controllers/SalesController');

salesRouter.get('/sales', SalesController.getAll);
salesRouter.get('/sales/:id', SalesController.getById);

module.exports = salesRouter;