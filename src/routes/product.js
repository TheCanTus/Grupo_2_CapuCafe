const express = require('express');
const router = express.Router();


const product = require('../controllers/productcontroller');


router.get('/productCart',  product.productCart);

router.get('/productos/:id', product.productDetail);


module.exports = router;