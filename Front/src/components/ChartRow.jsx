import React from 'react';

export function ChartRow(props) {
    const { rowData } = props;

    return (
        <tr>
            <td>{rowData.nombre}</td>
            <td>{rowData.descripcion}</td>
            <td>{rowData.categoria.categoria}</td> {/* Acceder al nombre de la categoría */}
            <td>{rowData.detail}</td>
        </tr>
    );
}
