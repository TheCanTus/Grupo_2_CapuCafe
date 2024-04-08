const db = require('../../database/models');

const Categoria = db.categoria;

const apiCategoriesController = {
    list: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();

            let respuesta = {
                meta: {
                    length: categorias.length,
                    url: '/api/categorias',
                    statusCode: 200
                },              
                data: categorias
            };

            res.status(200).json(respuesta);
        } catch (error) {
            console.error('Error: ' ,error);
            res.status(500).json({
                error: error.message,
                statusCode: 500
            });
        }
    },
    productsXCategories: (req, res) => {
        Producto.findAll({
            where: {
                categoriaId: req.params.id
            }
        })
            .then(products => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: products.length,
                        url: 'api/categories/:id'
                    },
                    data: products
                }
                res.json(respuesta);
            })
    }
}

module.exports = apiCategoriesController