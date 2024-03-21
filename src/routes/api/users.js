const express = require('express');
const userApiRoutes = express.Router();


const controllersApiUser = require('../../controllers/api/userApicontroller');

//GET request a localhost:8000/api/users
userApiRoutes.get('/', controllersApiUser.list)
userApiRoutes.get('/:id', controllersApiUser.detail)

module.exports = userApiRoutes;

