const express = require('express');
const userRoutes = express.Router();
//const fs = require('fs');
const path = require('path');
//const bcrypt = require('bcryptjs');
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const validacionesRegistro = require('../middlewares/userValidateMiddleware')
const upload = require('../middlewares/imgUserMiddleware')



const controllersUser = require(path.resolve(__dirname,'../controllers/usercontroller'));



userRoutes.get('/register', guestMiddleware, controllersUser.registrar);

userRoutes.post('/register', upload.single('avatar'), validacionesRegistro, controllersUser.create);

userRoutes.post('/login', controllersUser.loginProcess);
userRoutes.get('/login', guestMiddleware, controllersUser.login);
userRoutes.get('/users/profile', authMiddleware, controllersUser.profile)
userRoutes.get('/logout', controllersUser.logOut)


module.exports = userRoutes;

