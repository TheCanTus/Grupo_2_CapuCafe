module.exports = (sequelize,dataTypes) => {
    const alias = 'categoria';
    const cols = {
            id : {
                type: dataTypes.INTEGER(11),
                primaryKey : true ,
                allowNull : false,
                autoIncrement : true,
            },
            categoria : {
                type: dataTypes.STRING(50),
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
        tableName:'categorias',
        timeStamps : true,
    }
    const Categoria = sequelize.define(alias,cols,config)
    return Categoria;
}