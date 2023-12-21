const path = require('path');
const fs = require('fs');
const { log } = require('console');

module.exports = {
    index: (req,res) =>{
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        res.render(path.resolve(__dirname, '../views/admin/administrar.ejs'), {productos});
    },
    create: (req,res)=>{
        res.render(path.resolve(__dirname,'../views/admin/crearproducto.ejs'))
    },
    save: (req,res)=>{
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        let ultimoElemento = productos.pop();
        productos.push(ultimoElemento);

        let nuevoProducto = {
        id: ultimoElemento.id + 1,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        categoria: req.body.categoria
        }
        productos.push(nuevoProducto);

        let nuevoProductoGuardar = JSON.stringify(productos,null,2);

        fs.writeFileSync(path.resolve(__dirname,'../database/productos.json'),nuevoProductoGuardar);
        res.redirect('/products');
    },
    show: (req,res)=>{
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        let id = req.params.id;
        let miProducto;
        productos.forEach(producto => {
            if(producto.id == id){
                miProducto = producto;
            }
        });
        res.render(path.resolve(__dirname, '../views/admin/detail.ejs'),{miProducto})
    },
    edit : (req,res)=>{
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        let id = req.params.id;
        let productoEditar = productos.find(producto =>{
            return producto.id == id
        })
        res.render(path.resolve(__dirname,'../views/admin/editarproducto.ejs'),{productoEditar})
    },
    update : (req,res)=>{
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));  
        let id = req.params.id;
        req.body.id = id;
        let productosActualizar = productos.map(producto =>{
            if(producto.id == id){
                return producto = req.body;
            }
            return producto;
        })    
        let productoActualizado = JSON.stringify(productosActualizar,null,2);
        fs.writeFileSync(path.resolve(__dirname,'../database/productos.json'),productoActualizado);
        res.redirect('/products');

    },
    destroy: (req,res)=>{
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));  
        let id = req.params.id;
        let productosFinal = productos.filter(producto => producto.id != id)
        let productosGuardarFinal = JSON.stringify(productosFinal,null,2);
        fs.writeFileSync(path.resolve(__dirname,'../database/productos.json'),productosGuardarFinal);
        res.redirect('/products');
    }
}