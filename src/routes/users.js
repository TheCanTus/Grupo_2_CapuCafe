const express = require('express');
const userRoutes = express.Router();
const user = require('../controllers/usercontroller');

userRoutes.get('/login', user.login);

userRoutes.get('/register', user.register);

module.exports = userRoutes;