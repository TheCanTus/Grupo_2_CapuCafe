import React, { useState, useEffect } from "react";

export function LastMovieInDb() {
  const [lastMovie, setLastMovie] = useState(null);

  useEffect(() => {
    const fetchLastMovie = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products');
        const data = await response.json();
        // Obtener el último elemento de la lista de películas
        const lastMovieData = data.productos[data.productos.length - 1];
        setLastMovie(lastMovieData);
      } catch (error) {
        console.error('Error fetching last movie:', error);
      }
    };

    fetchLastMovie();
  }, []);

  if (!lastMovie) {
    return null; // Pondria un loader mientras espero, pero la soledad  es hermosa...
  }

  // URL completa de la imagen
  const imageUrl = `http://localhost:8000/images/productos/${lastMovie.imagenes}`;

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Ultimo producto en la Base de Datos
          </h5>
        </div>
        <div className="card-body">
          <div className="text-center">
            <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              style={{ width: "40rem" }}
              src={imageUrl}
              alt={lastMovie.nombre}
            />
          </div>
          <p>{lastMovie.descripcion}</p>
          <a
            className="btn btn-danger"
            target="_blank"
            rel="nofollow"
            href={`${lastMovie.detail}`}
          >
            Ver detalles
          </a>
        </div>
      </div>
    </div>
  );
}
