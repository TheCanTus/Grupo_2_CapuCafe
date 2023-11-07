const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/login', (req, res) =>{
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/register', (req, res) =>{
    res.sendFile(__dirname + '/views/register.html');
});

app.get('/productDetail', (req, res) =>{
    res.sendFile(__dirname + '/views/productDetail.html');
});

app.get('/productCart', (req, res) =>{
    res.sendFile(__dirname + '/views/productCart.html');
});


app.listen(8000, () => 
console.log("Levantando un servidor con Express"));