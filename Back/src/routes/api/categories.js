const express = require('express');
const router = express.Router();
const apiCategoriesController = require('../../controllers/api/categoryApiController');

router.get("/", apiCategoriesController.list);
router.get('/categories/:id', apiCategoriesController.productsXCategories);


module.exports = router;