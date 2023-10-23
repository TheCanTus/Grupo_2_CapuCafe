const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/views/home.html');
});

app.listen(8000, () => 
console.log("Levantando un servidor con Express"));ç

