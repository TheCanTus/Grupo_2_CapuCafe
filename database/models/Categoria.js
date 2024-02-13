module.exports = (sequelize,dataTypes) => {
    const alias = 'Categoria';
    const cols = {
            id : {
                type: dataTypes.INTEGER(11),
                primaryKey : true ,
                allowNull : false,
                autoIncrement : true,
            },
            color : {
                type: dataTypes.STRING(50),
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
    const Categoria = sequelize.define(alias,cols,config)
    return Categoria;
}