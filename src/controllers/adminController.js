const path = require('path');
const fs = require('fs');
const db = require('../database/models')
const { validationResult } = require('express-validator');
const { log } = require('console');


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
    save: async (req, res) => {
        const categorias = await Categorias.findAll()
        try {   
            const resultValidation = validationResult(req);
            if (!resultValidation.isEmpty()) {
                return res.render('../views/admin/crearproducto.ejs', {
                    errors: resultValidation.mapped(),
                    old: req.body,
                    categorias
                }
                );
            }
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
        } catch (error) { 
            console.error(error);
        }
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
        let productoId = req.params.id;
        Producto
            .destroy({ where: { id: productoId }, force: true })
            .then(() => {
                return res.redirect(301, '/products');
            })
            .catch(error => res.send(error))
    }
}