const fs = require("fs")

const user = {
    fileName: './database/users.json',

    getData: function() {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    findAll: function (){
        return this.getData
    },

    findByPk: function(id){
        let AllUsers = this.findAll();
        let userFound = AllUsers.find(oneUser =>  oneUser.id === id);
        return userFound;
    },

    findByField: function(field , text){
        let AllUsers = this.findAll();
        let userFound = AllUsers.find(oneUser =>  oneUser[field] === text);
        return userFound;
    }
}