const path = require('path')

const product = {
    productCart: (req, res) =>{
        res.render(path.join(__dirname , '../views/productCart.ejs'));
    },
    productDetail: (req, res) =>{
        res.render(path.join(__dirname , '../views/productDetail.ejs'));
    },
    crearProducto: (req, res) =>{
        res.render(path.join(__dirname , '../views/crearProducto.ejs'))
    },
    editarProducto: (req, res) =>{
        res.render(path.join(__dirname , '../views/editarProducto.ejs'))
    }
};

module.exports = product;