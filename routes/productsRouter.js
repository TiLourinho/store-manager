const productsRouter = require('express').Router();

const ProductController = require('../controllers/ProductController');

productsRouter.get('/products', ProductController.getAll);
productsRouter.get('/products/:id', ProductController.getById);

module.exports = productsRouter;