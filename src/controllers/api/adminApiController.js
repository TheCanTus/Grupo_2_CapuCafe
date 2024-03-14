const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Categorias = db.Categorias;
const Color = db.Color;
const Producto = db.Producto;

const adminApiController = {
    'index': (req, res) => {
        db.Producto.findAll()
        .then(productos => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: productos.length,
                    url: 'api/producto'
                },
                data: productos
            }
                res.json(respuesta);
            })
    },
    save: (req,res) => {
        Producto
        .create(
            {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                categoria: req.body.categoria,
                imagenes: req.file.filename,
            }
        )
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/Producto/create'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/Producto/create'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
}



module.exports = moviesAPIController;

/* 
"dependencies": {
    "bcryptjs": "^2.4.3",
    "cookie-parser": "~1.4.4",
    "cors": "^2.8.5",
    "debug": "~2.6.9",
    "dotenv": "^10.0.0",
    "ejs": "~2.6.1",
    "express": "^4.17.1",
    "express-session": "^1.17.2",
    "express-validator": "^6.12.1",
    "http-errors": "~1.6.3",
    "method-override": "^3.0.0",
    "morgan": "~1.9.1",
    "multer": "^1.4.3",
    "mysql2": "^2.3.2",
    "sequelize": "^6.7.0"
  },
  "devDependencies": {
    "sequelize-cli": "^6.2.0",
    "nodemon": "^2.0.20"
  } */