const salesRouter = require('express').Router();

const SalesController = require('../controllers/SalesController');

salesRouter.get('/sales', SalesController.getAll);

module.exports = salesRouter;