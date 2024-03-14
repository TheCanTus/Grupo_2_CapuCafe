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
                type: dataTypes.INTEGER(11),
                foreignKey: true,
                allowNull : false,
                references: { model: 'categoria', key: 'id' }
            },
            colorId : {
                type: dataTypes.INTEGER(11),
                foreignKey: true,
                references: { model: 'colores', key: 'id' }
            },
            precio : {
                type: dataTypes.FLOAT(12.2),
                allowNull : false,
            },
            createdAt : {
                type : dataTypes.DATE 
            },
            updatedAt : {
                type : dataTypes.DATE 
            }
    }
    const config ={
        timeStamps : true,
        underScored : true,
    }
    const Producto = sequelize.define(alias,cols,config)
    return Producto;
}