const express = require('express');
const userRoutes = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcryptjs');

const {body} = require('express-validator');

const controllersUser = require(path.resolve(__dirname,'../controllers/usercontroller'));

let archivoUsuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/usuarios.json')));

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, path.resolve(__dirname, '../../public/images/usuarios'))
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

userRoutes.get('/registro', controllersUser.registrar);

userRoutes.post('/registro', upload.single('avatar'), validacionesRegistro, controllersUser.create);

module.exports = userRoutes;

/* userRoutes.get('/login', user.login);

userRoutes.get('/register', user.register);

router.get('/registro', usercontroller.mostrarFormularioRegistro);
router.post('/registro', upload.single('imagenPerfil'), usercontroller.registrarUsuario);

module.exports = router;

module.exports = userRoutes; */
