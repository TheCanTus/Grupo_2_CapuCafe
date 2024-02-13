module.exports = (sequelize,dataTypes) => {
    const alias = 'UsuarioProducto';
    const cols = {
            id : {
                type: dataTypes.INTEGER(11),
                primaryKey : true ,
                allowNull : false,
                autoIncrement : true,
            },
            clienteId : {
                type: dataTypes.INTEGER(11),
                foreignKey: true,
                allowNull : false,
            },
            productoID : {
                type: dataTypes.INTEGER(11),
                foreignKey: true,
                allowNull : false,
            },
            cantidad : {
                type: dataTypes.INTEGER(11),
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
    const UsuarioProducto = sequelize.define(alias,cols,config)
    return UsuarioProducto;
}