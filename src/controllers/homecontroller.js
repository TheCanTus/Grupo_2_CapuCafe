const path = require('path')
const fs = require ('fs')

let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname,'..', 'database', 'productos.json')))


const metodos = {
    home:(req, res) =>{res.render(path.join(__dirname , '../views/index.ejs'), {productos});}
}


module.exports = metodos;