const path = require('path');
const fs = require('fs');
const db = require('../database/models')

const Producto = db.Producto;

module.exports = {
    productCart: (req, res) =>{
        res.render('productCart');
    },
    productDetail: (req,res)=>{
        const productosPromise = Producto.findAll();
        const id = req.params.id;
        
        productosPromise.then(productos => {
            let miProducto = null;
            productos.forEach(producto => {
                if (producto.id == id) {
                    miProducto = producto;
                }
            });
            res.render('productDetail', { productos, miProducto });
        }).catch(error => {
            console.error('Error al obtener los productos: ', error);
            res.status(500).send("Hubo un error interno del servidor");
        });
    }
};