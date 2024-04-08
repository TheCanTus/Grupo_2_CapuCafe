// Importar módulos y configuraciones
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const path = require('path');

//Rutas
const routes = require('./routes/routes');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/product');
const adminRoutes = require('./routes/admin');

//Rutas api
const userApiRoutes = require('./routes/api/users');
const productsApiRoutes = require('./routes/api/products');
const categoriesApiRoutes = require('./routes/api/categories');


const methodOverride = require('method-override');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')
const isAdmin = require('./middlewares/adminMiddleware');


// Configurar sesión de Express
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));

// Middleware Cookies
app.use(cookieParser());

// Configuración de vistas y motor de plantillas
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Middleware estático, analizador de formularios y override de método HTTP
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Middleware de recordar usuario y middleware de usuario logueado
app.use(userLoggedMiddleware);
//app.use(isAdmin)
app.use(isAdmin);

// Rutas de la aplicación
app.use(routes);
app.use(userRoutes);
app.use(productRoutes);
app.use('/products',adminRoutes);

//rutas api
app.use('/api/users', userApiRoutes);
app.use('/api/products', productsApiRoutes);
app.use('/api/categories', categoriesApiRoutes);



// Iniciar servidor
app.listen(8000, () =>
  console.log("Levantando un servidor en el puerto 8000"));
