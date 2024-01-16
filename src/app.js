const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/routes')
const userRoutes = require('./routes/users')
const productRoutes = require('./routes/product')
const adminRoutes = require('./routes/admin');
const methodOverride = require('method-override');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: './public/images/users/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
const session = require('express-session')

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}))

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use('/', routes);
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', adminRoutes);



app.listen(8000, () =>
  console.log("Levantando un servidor en el puerto 8000"));