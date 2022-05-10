const salesRouter = require('express').Router();
const rescue = require('express-rescue');
const validateSales = require('../middlewares/salesValidation');

const SalesController = require('../controllers/SalesController');

salesRouter.get('/sales', rescue(SalesController.getAll));
salesRouter.get('/sales/:id', rescue(SalesController.getById));
salesRouter.post('/sales', validateSales, rescue(SalesController.create));
salesRouter.put('/sales/:id', validateSales);

module.exports = salesRouter;