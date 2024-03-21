module.exports = (sequelize,dataTypes) => {
    const alias = 'Color';
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
                type : dataTypes.DATE 
            },
            updatedAt : {
                type : dataTypes.DATE 
            }
    }
    const config ={
        tableName:'colores',
        timestamps : true,
    }
    const Color = sequelize.define(alias,cols,config)
    return Color;
}