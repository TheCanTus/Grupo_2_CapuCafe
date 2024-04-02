const express = require('express');
const productApiRoutes = express.Router();


const controllersApiproduct = require('../../controllers/api/productApiController');


productApiRoutes.get('/', controllersApiproduct.list)
productApiRoutes.get('/:id', controllersApiproduct.list)

module.exports = productApiRoutes;
