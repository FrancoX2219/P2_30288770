const express = require('express');
const path = require('path');
const ContactosController = require('./ContactosController');

const app = express();
const contactosController = new ContactosController();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', contactosController.router);

app.get('/', (req, res) => {
    res.render('index'); // Renderiza la vista 'index.ejs'
});

app.get('/confirmacion', (req, res) => {
    res.send('Contacto enviado exitosamente.');
});

const PORT = process.env.PORT || 4000; // Usar la variable de entorno PORT proporcionada por Render
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;


