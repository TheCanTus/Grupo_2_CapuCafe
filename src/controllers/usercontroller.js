const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const {validationResult}=require('express-validator');

const usercontroller = {
  registrar: (req, res) => {
    res.render(path.resolve(__dirname,'../views/users/registro.ejs'));
  },

  create: (req, res) => {
    let archivoUsuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/usuarios.json')));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        let usuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file.filename,
            role: 1,
        }
        archivoUsuarios.push (usuario);
        let nuevoUsuario = JSON.stringify(archivoUsuarios, null, 2)
        fs.writeFileSync(path.resolve(__dirname,'../database/usuarios.json',nuevoUsuario));
        res.redirect('/login')
        } else{
            return res.render(path.resolve(__dirname,'../views/users/registro.ejs'),{errors: errors.errors, old:req.body});
        }
    }
}

const user = {
    login:(req, res) =>{res.render(path.join(__dirname , '../views/users/login.ejs'));},
    register:(req, res) =>{res.render(path.join(__dirname , '../views/users/register.ejs'));},
    
    loginProcess: (req , res) => {
        let userToLogin = user.findByField('NombreDeUsuario', req.body.NombreDeUsuario);
        if (userToLogin) {
            let contraseñaCorrecta = bycryptjs.compareSync(req.body.contraseña, UserToLogin.contraseña);
            if (contraseñaCorrecta){
                delete userToLogin.contraseña;
                req.session.userLogged = userToLogin;
                return res.redirect('../views/index.ejs')
            }
            return res.render('../views/users/login.ejs', {
                errors : {
                    contraseña: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            })
        }
        return res.render('../views/users/login.ejs', {
            errors : {
                email: {
                    msg: 'No se encontró el nombre de usuario'
                }
            }
        })
    },
}

module.exports = usercontroller;