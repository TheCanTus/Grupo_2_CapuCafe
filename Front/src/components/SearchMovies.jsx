import React, { useState, useEffect } from 'react';

function normalizeText(text) {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

export function SearchMovies() {
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const searchKeyword = event.target.elements.search.value;
        setKeyword(searchKeyword);
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/products');
                const data = await response.json();
                setProducts(data.productos);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        normalizeText(product.nombre).includes(normalizeText(keyword))
    );

    return (
        <div className="container-fluid">
            <div className="row my-4">
                <div className="col-12 col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="search">Buscar por Nombre:</label>
                            <input type="text" className="form-control" id="search" name="search" />
                        </div>
                        <button type="submit" className="btn btn-info">Buscar</button>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h2>Productos para la palabra: {keyword}</h2>
                </div>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, i) => (
                        <div className="col-sm-6 col-md-3 my-4" key={i}>
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h5 className="m-0 font-weight-bold text-gray-800">{product.nombre}</h5>
                                </div>
                                <div className="card-body">
                                    <div className="text-center">
                                        <img
                                            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                                            src={`http://localhost:8000/images/productos/${product.imagenes}`}
                                            alt={product.nombre}
                                            style={{ width: '90%', height: '400px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <p>Precio: {product.precio}</p>
                                    <p>Descripción: {product.descripcion}</p>
                                    <p>Categoría: {product.categoria.categoria}</p> {/* Corregido aquí */}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <div className="alert alert-warning text-center">No se encontraron productos</div>
                    </div>
                )}
            </div>
        </div>
    );
}
