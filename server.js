const express = require('express');
const path = require('path');
const ContactosController = require('./ContactosController');

const app = express();
const contactosController = new ContactosController();

// Configuración para que Express use EJS como motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar el router del controlador de contactos
app.use('/', contactosController.router);

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.render('index'); // Renderiza la vista 'index.ejs'
});

app.get('/confirmacion', (req, res) => {
    res.send('Contacto enviado exitosamente.');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
