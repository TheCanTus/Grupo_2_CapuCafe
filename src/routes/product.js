const express = require('express');
const productRoutes = express.Router();
const product = require('../controllers/productcontroller')

productRoutes.get('/productCart', product.productCart);

productRoutes.get('/productDetail', product.productDetail);

module.exports = productRoutes;