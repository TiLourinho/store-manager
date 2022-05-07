const productsRouter = require('express').Router();
const rescue = require('express-rescue');

const ProductController = require('../controllers/ProductController');

productsRouter.get('/products', rescue(ProductController.getAll));
productsRouter.get('/products/:id', rescue(ProductController.getById));

module.exports = productsRouter;