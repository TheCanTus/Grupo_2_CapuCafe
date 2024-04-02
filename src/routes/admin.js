const express = require('express');
const router = express.Router();
const path = require('path');

//Importación del Middleware
const adminController = require(path.resolve(__dirname,'../controllers/adminController'));
const isAdminRoute = require('../middlewares/admRouteMiddleware');
const validacionesProductos = require('../middlewares/productValidatorMiddleware');
const upload = require('../middlewares/imgProductMiddleware');



router.get('/', isAdminRoute, adminController.index);
router.get('/create', isAdminRoute,  upload.single('imagenes'),validacionesProductos, adminController.create);
router.post('/create', isAdminRoute, upload.single('imagenes'), adminController.save);
router.get('/detail/:id', isAdminRoute,adminController.show);
router.put('/:id/edit', isAdminRoute, upload.single('imagenes'), adminController.update);
router.get('/delete/:id', isAdminRoute,adminController.destroy);
router.get('/:id/edit', isAdminRoute, adminController.edit);

module.exports = router;