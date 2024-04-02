const {body} = require('express-validator');

const validacionesProductos = [
    body('nombre')
    .notEmpty()
    .withMessage('el nombre es obligatorio')
    .isLength({ min: 5 })
    .withMessage('el nombre debe tener al menos 5 caracteres'),
    body('descripcion')
    .notEmpty()
    .withMessage( 'la descripción es obligatoria' )
    .isLength({ min:20 })
    .withMessage('la descripcion debe tener al menos 20 caracteres'),
]
module.exports = validacionesProductos