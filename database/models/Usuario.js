module.exports = (sequelize,dataTypes) => {
    const alias = 'Usuario';
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
            apellido : {
                type: dataTypes.STRING(50),
                allowNull : false,
            },
            email : {
                type: dataTypes.STRING(100),
                allowNull : false,
            },
            password : {
                type: dataTypes.STRING(50),
                allowNull : false,
            },
            rol : {
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
    const Usuario = sequelize.define(alias,cols,config)
    return Usuario;
}