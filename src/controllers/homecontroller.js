const path = require('path')

const metodos = {
    home:(req, res) =>{res.render(path.join(__dirname , '../views/index.ejs'));}
}


module.exports = metodos;