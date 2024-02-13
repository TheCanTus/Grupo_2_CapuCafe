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
    const Color = sequelize.define(alias,cols,config)
    return Color;
}