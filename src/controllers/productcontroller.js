const path = require('path');
const fs = require('fs');
const db = require('../database/models')

const Producto = db.Producto;

module.exports = {
    productCart: (req, res) =>{
        res.render('productCart');
    },
    productDetail: (req,res)=>{
        const productos = Producto.findAll();

        const id = req.params.id;
        let miProducto;
        productos.forEach(producto => {
            if(producto.id == id){
                miProducto = producto;
            }
        }) ;
        res.render('productDetail', {productos, miProducto});
    }
};