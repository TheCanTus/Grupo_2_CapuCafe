const express = require('express');
const router = express.Router();
const metodos = require('../controllers/homecontroller')



router.get('/', metodos.home);





module.exports = router;