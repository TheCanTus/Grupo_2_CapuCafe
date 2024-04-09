// Dentro del componente Chart
import React, { Component } from 'react';
import { ChartRow } from './ChartRow';

export class Chart extends Component {
    constructor() {
        super();
        this.state = {
            tableRowsData: [],
            categorias: []
        };
    }

    componentDidMount() {
        // Obtener datos de productos
        fetch('http://localhost:8000/api/products')
            .then(res => res.json())
            .then(data => {
                if (data && data.productos) {
                    this.setState({ tableRowsData: data.productos });
                } else {
                    console.error('Datos no válidos recibidos del servidor');
                }
            })
            .catch(error => console.error('Error al obtener datos del servidor:', error));

        // Obtener datos de categorías
        fetch('http://localhost:8000/api/categories')
            .then(res => res.json())
            .then(data => {
                if (data && data.categorias) {
                    this.setState({ categorias: data.categorias });
                } else {
                    console.error('Datos no válidos recibidos del servidor');
                }
            })
            .catch(error => console.error('Error al obtener datos del servidor:', error));
    }

    render() {
        return (
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripcion</th>
                                    <th>Categoria</th>
                                    <th>Detalle</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripcion</th>
                                    <th>Categoria</th>
                                    <th>Detalle</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                {this.state.tableRowsData.map((row, i) => (
                                    <ChartRow key={i} rowData={row} categorias={this.state.categorias} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
