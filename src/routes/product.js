const express = require('express');
const productRoutes = express.Router();
const product = require('../controllers/productcontroller')
const multer = require('multer');
const path = require('path')
const adminController = require(path.resolve(__dirname,'../controllers/adminController'));
const { log } = require('debug/src/browser');

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

productRoutes.get('/productCart', product.productCart);

productRoutes.get('/products/detail', product.productDetail);

productRoutes.get('/crearProducto', upload.single('imagenes'), product.crearProducto);

productRoutes.get('/editarProducto', upload.single('imagenes'), product.editarProducto);


module.exports = productRoutes;