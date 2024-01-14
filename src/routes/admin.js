const express = require('express');
const router = express.Router();
const path = require('path');


const adminController = require(path.resolve(__dirname,'../controllers/adminController'));



router.get('/products', adminController.index);
router.get('/products/create', adminController.create);
router.post('/products/create', adminController.save);
router.get('/products/detail/:id', adminController.show);
router.get('/products/:id/edit', adminController.edit);
router.put('/products/:id/edit', adminController.update);
router.get('/products/delete/:id', adminController.destroy);

module.exports = router;