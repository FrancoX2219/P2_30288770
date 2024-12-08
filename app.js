require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var ContactosController = require('./ContactosController'); // Importa el controlador

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var contactosController = new ContactosController(); // Crea una instancia del controlador

app.post('/enviar-mensaje', function(req, res) {
   contactosController.add(req, res); // Usa el controlador para manejar la solicitud
});

app.get('/contactos', function(req, res) {
   contactosController.get(req, res); // Nueva ruta para mostrar los contactos
});

app.get('/hello', function(req, res) {
   res.send('Hola Mundo,Nombre:Franco Javier Vasquez Gonzales, Cedula:30.288,770,Seccion:3');
});

module.exports = app;
