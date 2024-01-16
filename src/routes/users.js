const express = require('express');
const userRoutes = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const guestMiddleware = require('../middlewares/guestMiddleware')

const {body} = require('express-validator');

const controllersUser = require(path.resolve(__dirname,'../controllers/usercontroller'));

let archivoUsuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/usuarios.json')));

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, path.resolve(__dirname, '../../public/images/users'))
    },
    filename: (req, file, cb)=> {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        //console.log(fileName)
        cb(null,fileName)
    }
})
const upload = multer({storage});

const validacionesRegistro = [
    body('nombre').isLength({min:3}).withMessage('El campo nombre no puede estar vacio'),
    body('apellido').isLength({min:3}).withMessage('El campo apellido no puede estar vacio'),
    body('email').isEmail().withMessage('Debe agregar un email válido'),
    body('password').isLength({min:6}).withMessage('El campo password debe contener como mínimo 6 caracteres'),
    body('confirm_password').isLength({min:6}).withMessage('El campo confirmar password debe contener como mínimo 6 caracteres'),
    body('confirm_password').custom((value,{req})=>{
        if(req.body.password == value){
            return true; //Si se retorna un true, significa ue todo esta bien
        }else{
            return false;  //Al retornar un false - Express Validator entiende ue hay un error
        }
    }).withMessage('Las contraseas deben ser iguales'),
    body('avatar').custom((value, {req})=>{
        if(req.file != undefined){
            return true;
        }else{
            return false;
        }
    }).withMessage('Debe eligir una imagen de perfil')

];

userRoutes.get('/register', guestMiddleware, controllersUser.registrar);

userRoutes.post('/register', upload.single('avatar'), validacionesRegistro, controllersUser.create);

userRoutes.post('/login', controllersUser.loginProcess);
userRoutes.get('/login', guestMiddleware, controllersUser.login);
userRoutes.get('/user/profile', controllersUser.profile)


module.exports = userRoutes;

