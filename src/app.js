const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/routes')
const userRoutes = require('./routes/users')
const productRoutes = require('./routes/product')

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, '../public')))

app.use('/', routes);
app.use('/', userRoutes);
app.use('/', productRoutes);

app.listen(8000, () => 
console.log("Levantando un servidor con Express"));