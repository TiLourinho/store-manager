const salesRouter = require('express').Router();
const rescue = require('express-rescue');

const SalesController = require('../controllers/SalesController');

salesRouter.get('/sales', rescue(SalesController.getAll));
salesRouter.get('/sales/:id', rescue(SalesController.getById));

module.exports = salesRouter;