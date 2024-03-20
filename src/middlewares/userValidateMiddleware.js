const {body} = require('express-validator');


const validacionesRegistro = [
    body('nombre').
    isLength({min:3})
    .withMessage('El campo nombre no puede estar vacio'),
    body('apellido')
    .isLength({min:3})
    .withMessage('El campo apellido no puede estar vacio'),
    body('email')
    .isEmail()
    .withMessage('Debe agregar un email válido'),
    body('password')
    .isLength({min:6})
    .withMessage('El campo password debe contener como mínimo 6 caracteres'),
    body('confirm_password')
    .isLength({min:6})
    .withMessage('El campo confirmar password debe contener como mínimo 6 caracteres'),
    body('confirm_password')
    .custom((value,{req})=>{
        if(req.body.password == value){
            return true; //Si se retorna un true, significa ue todo esta bien
        }else{
            return false;  //Al retornar un false - Express Validator entiende ue hay un error
        }
    })
    .withMessage('Las contraseas deben ser iguales'),
    body('avatar')
    .custom((value, {req})=>{
        if(req.file != undefined){
            return true;
        }else{
            return false;
        }
    })
    .withMessage('Debe eligir una imagen de perfil')

];

module.exports = validacionesRegistro