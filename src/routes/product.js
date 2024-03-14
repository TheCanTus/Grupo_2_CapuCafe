const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { log } = require('debug/src/browser');

const product = require('../controllers/productcontroller');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname , '..\public\images\productos'));
    },
    filename: (req, file, cb) => {
        console-log(file);
        const newFileName = 'producto-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const upload = multer({storage : storage});

router.get('/productCart',  product.productCart);

router.get('/productos/:id', product.productDetail);


module.exports = router;