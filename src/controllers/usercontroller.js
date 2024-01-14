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
            /* const { nombre, correo, contrasenia } = req.body;

    const imagenPerfil = req.file ? req.file.filename : null;
    const hashedPassword = bcrypt.hashSync(contrasenia, 10);

    const nuevoUsuario = {
      nombre,
      correo,
      contrasenia: hashedPassword,
      imagenPerfil
    };

    const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    usersData.push(nuevoUsuario);
    fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));

    res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
  } */


/* const user = {
    login:(req, res) =>{res.render(path.join(__dirname , '../views/login.ejs'));},
    register:(req, res) =>{res.render(path.join(__dirname , '../views/register.ejs'));}
} */

module.exports = usercontroller;