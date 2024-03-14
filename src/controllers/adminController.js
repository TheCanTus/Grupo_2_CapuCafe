const path = require('path');
const fs = require('fs');
const { log } = require('console');
const db = require('../database/models')

const Categorias = db.categoria;
const Color = db.Color;
const Producto = db.Producto;

module.exports = {
    index: (req, res) => {
        db.Producto.findAll()
            .then(productos => {
                res.render("admin/administrar", { productos })
            })
    },
    create: (req, res) => {
        Categorias.findAll()
            .then((categorias) => {
                res.render('admin/crearproducto', { categorias })
            })
    },
    save: (req, res) => {
        Producto.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            categoriaId: req.body.categoriaId,
            imagenes: req.file.filename,
        })
            .then(() => {
                res.redirect('/products');
            })
            .catch(error => res.send(error));

        console.log(req.body.categoriaId);
    },
    show: async (req, res) => {
        try {
            const id = req.params.id;
            const miProducto = await Producto.findByPk(id);

            if (miProducto) {
                res.render('admin/detail', { miProducto })
            } else {
                res.status(404).send('Producto no encontrado')
            }
        } catch (error) {
            console.error('Error al obtener el producto', error);
            res.status(500).send('Error interno del servidor')

        }
    },
    edit: async (req, res) => {
        try {
            const id = req.params.id;
            const productoEditar = await Producto.findByPk(id);
            const categorias = await Categorias.findAll()
            const colores = await Color.findAll()

            if (!productoEditar) {
                return res.status(404).send('Producto no encontrado')
            }
            res.render('admin/editarproducto', { productoEditar, categorias, colores })
        } catch (error) {
            console.error('Error al editar el producto', error);
            res.status(500).send('Error interno del servidor')
        }

    },
    update: async (req, res) => {

        try {
            const id = req.params.id;
            const { nombre, descripcion, categoriaId, colores, precio } = req.body;

            const producto = { nombre, descripcion, categoriaId, colores, precio };

            await Producto.update(producto, { where: { id } });

            res.redirect('/products');

        } catch (error) {
            console.error('Error al actualizar el producto: ', error)
            res.status(500).send("Hubo un error interno del servidor")
        }
    },
    destroy: async (req, res) => {
/*         try {
            const id = req.params.id;
            await Producto.destroy({ where: { id } })
            res.redirect('/products')
        } catch (error) {
            console.error('Error al eliminar el producto: ', error)
            res.status(500).send("Hubo un error interno del servidor")

        } */
    }
}