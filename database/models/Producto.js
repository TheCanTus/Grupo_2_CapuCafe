module.exports = (sequelize,dataTypes) => {
    const alias = 'Producto';
    const cols = {
            id : {
                type: dataTypes.INTEGER(11),
                primaryKey : true ,
                allowNull : false,
                autoIncrement : true,
            },
            nombre : {
                type: dataTypes.STRING(50),
                allowNull : false,
            },
            descripcion : {
                type: dataTypes.STRING(255),
            },
            categoriaId : {
                type: dataTypes.STRING(255),
                foreignKey: true,
                allowNull : false,
            },
            colorId : {
                type: dataTypes.STRING(50),
                foreignKey: true,
            },
            precio : {
                type: dataTypes.FLOAT(12.2),
                allowNull : false,
            },
            createdAt : {
                type : dataTypes.DATETIME
            },
            updatedAt : {
                type : dataTypes.DATETIME
            }
    }
    const config ={
        timeStamps : true,
        underScored : true,
    }
    const Producto = sequelize.define(alias,cols,config)
    return Producto;
}