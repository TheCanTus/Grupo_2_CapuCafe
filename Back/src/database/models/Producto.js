module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define(
        "Producto",
        {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        nombre:  DataTypes.STRING,
        descripcion: DataTypes.STRING,
        categoriaId: DataTypes.INTEGER,
        imagenes: DataTypes.STRING,
        colorId: DataTypes.INTEGER,
        precio: DataTypes.FLOAT,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: 'productos',
        timestamps: false,
    }
    );

    Producto.associate = (models) => {
        Producto.belongsTo(models.categoria, {
            foreignKey: 'categoriaId',
            as: 'categoria',
        });
    };

    return Producto;
}
