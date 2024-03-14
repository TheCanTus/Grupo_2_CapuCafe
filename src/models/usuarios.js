const fs = require("fs")
const path =require('path');
const { all } = require("proxy-addr");

const user = {
    fileName: '../database/usuarios.json',

    getData: function() {
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, this.fileName), 'utf-8'));
    },

    generateId: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser){
            return lastUser.id + 1;
        }
        return 1
    },

    findAll: function (){
        return this.getData()
    },

    findByPk: function(id){
        let allUsers = this.findAll()
        let userFound = allUsers.find(oneUser => oneUser.id === id)
        return userFound
    },

    findByField: function(field , text){
        let AllUsers = this.findAll();
        let userFound = AllUsers.find(oneUser =>  oneUser[field] === text);
        return userFound;
    },

    create: function(userData){
        let allUser = this.fileAll();
        let newUser = {
            id : this.generateId(),
            ...userData
        }
        allUser.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUser, null , ' '));
        return true;
    },
    delete:  function(id){
        let allUsers= this.findAll();
        let finalUsers = allUsers.filter(oneUser =>  oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null , ' '));
        return true;
    }
}

module.exports = user