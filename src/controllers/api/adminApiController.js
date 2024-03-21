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



module.exports = adminApiController;