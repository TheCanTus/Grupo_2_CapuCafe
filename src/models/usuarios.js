const fs = require("fs")
const path =require('path');

const user = {
    fileName: '../database/usuarios.json',

    getData: function() {
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, this.fileName), 'utf-8'));
    },

    findAll: function (){
        return this.getData()
    },


    findByField: function(field , text){
        let AllUsers = this.findAll();
        let userFound = AllUsers.find(oneUser =>  oneUser[field] === text);
        return userFound;
    }
}

module.exports = user