const db = require('../../database/models');

const Producto = db.Producto;

const productsApiController = {
    // Obtener lista de productos
    'list': (req, res) => {
        Producto.findAll()
            .then(productos => {
                let formattedproducts = productos.map(producto => {
                    return {
                        id: producto.id,
                        nombre: producto.nombre,
                        descripcion: producto.descripcion,
                        categoria: producto.categoriaId,
                        detail: `/api/productos/${producto.id}`
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
    detail: async (req, res) => {
        try {
            const producto = await Producto.findByPk(req.params.id, {                
                include: ['categoria']
            });

            let respuesta = {
                meta: {                        
                    url: '/api/producto/:id'                    
                }
            };
            if (producto) {                
                respuesta = {
                    meta: {                        
                        statusCode: 200
                    },
                    data: producto
                };
                res.status(200).json(respuesta);
            } else {
                respuesta = {
                    meta: {                        
                        statusCode: 400                      
                    },
                    data: null
                };
                res.status(400).json(respuesta);
            };
        } catch (error) {
            console.error('Error: ' ,error);
            res.status(500).json({
                error: error.message,
                statusCode: 500
            });
        }
    }


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