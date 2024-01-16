const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
//Importación del Middleware
const adminController = require(path.resolve(__dirname,'../controllers/adminController'));

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, path.resolve(__dirname, '../../public/images/productos'))
    },
    filename: (req, file, cb)=> {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        console.log(fileName)
        cb(null,fileName)
    }
})
const upload = multer({storage})




router.get('/products', adminController.index);
router.get('/products/create', adminController.create);
router.post('/products/create', upload.single('imagenes'), adminController.save);
router.get('/products/detail/:id', adminController.show);
router.get('/products/:id/edit', adminController.edit);
router.put('/products/:id/edit', adminController.update);
router.get('/products/delete/:id', adminController.destroy);

module.exports = router;