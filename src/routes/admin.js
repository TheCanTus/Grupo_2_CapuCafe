const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

//Importación del Middleware
const adminController = require(path.resolve(__dirname,'../controllers/adminController'));
const isAdminRoute = require('../middlewares/admRouteMiddleware');

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




router.get('/', isAdminRoute, adminController.index);
router.get('/create', isAdminRoute, adminController.create);
router.post('/create', isAdminRoute, upload.single('imagenes'), adminController.save);
router.get('/detail/:id', isAdminRoute,adminController.show);
router.put('/:id/edit', upload.single('imagenes'), isAdminRoute, adminController.update);
router.get('/delete/:id', isAdminRoute,adminController.destroy);
router.get('/:id/edit', isAdminRoute, adminController.edit);

module.exports = router;