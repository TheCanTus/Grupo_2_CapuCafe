module.exports = (sequelize, dataTypes) => {
    const Categoria = sequelize.define(
        'categoria', {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        categoria: dataTypes.STRING,
        createdAt: dataTypes.DATE,
        updatedAt: dataTypes.DATE
        },
        {
            tableName: 'categorias',
            timestamps: true,
        }
    );

    Categoria.associate = (models) => {
        Categoria.hasMany(models.Producto, {
            as: 'Productos',
            foreignKey: 'categoriaId',
        });
    };

    return Categoria;
};