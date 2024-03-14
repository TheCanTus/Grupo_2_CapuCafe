const path = require('path')
const fs = require ('fs')
const db = require('../database/models')


const metodos = {
    home:(req, res) =>{
        db.Producto.findAll()
        .then(productos=>{
            res.render(path.join(__dirname , '../views/index.ejs'), {productos});
        })
        
    
    }
}


module.exports = metodos;