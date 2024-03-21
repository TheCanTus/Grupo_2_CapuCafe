const db = require('../../database/models');



const Producto = db.Producto;
const Categoria = db.Categoria;
const Color = db.Color;
;

const productsApiController = {
    // Obtener lista de productos
    'list': (req, res) => {
        Producto.findAll()
            .then(productos => {
                let formattedproducts = productos.map(producto => {
                    return {
                        id: producto.id,
                        name: producto.name,
                        detail: `/api/productos`
                    };
                });

                let respuesta = {
                    count: productos.length,
                    productos: formattedproducts
                };

                res.json(respuesta);
            })
            .catch(err => {
                console.error('Error al obtener productos:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
            });
    },
/*     'list': (req, res) => {
        Producto.findAll({
            include: ['categoria']
        })
        .then(productos => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: productos.length,
                    url: 'api/productos'
                },
                data: productos
            }
                res.json(respuesta);
            })
    }, */
};


module.exports = productsApiController