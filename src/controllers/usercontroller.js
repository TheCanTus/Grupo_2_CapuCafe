const path = require('path')

const user = {
    login:(req, res) =>{res.render(path.join(__dirname , '../views/login.ejs'));},
    register:(req, res) =>{res.render(path.join(__dirname , '../views/register.ejs'));}
}


module.exports = user;