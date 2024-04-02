const db = require('../../database/models');

const Categoria = db.categoria;

const apiCategoriesController = {
    list: (req, res) => {
        Categoria.findAll({
        })
            .then(categories => {
                let lista = categories.map((category)=>({
                    id: category.id,
                    categoria: category.categoria,
                }))
                res.json(
                    {
                        count: {
                            total: categories.length,
                            // url: "http://localhost:8000/api/categories"
                        },
                        categories: lista
                    },
                )
            })
    }
}

module.exports = apiCategoriesController