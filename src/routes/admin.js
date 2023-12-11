const express = require('express');
const router = express.Router();
const path = require('path');


const adminController = require(path.resolve(__dirname,'../controllers/adminController'));



router.get('/administrar', adminController.index);
router.get('/administrar/create', adminController.create);

router.get('/administrar/detail/:id', adminController.show);
router.get('/administrar/edit/:id', adminController.edit);
router.put('/administrar/edit/:id', adminController.update);
router.get('/administrar/delete/:id', adminController.destroy);

module.exports = router;