const ContactosModel = require('./ContactosModel');

class ContactosController {
    constructor() {
        this.contactosModel = new ContactosModel();
    }

    add(req, res) {
        const { email, nombre, comentario } = req.body;
        const ip = req.ip;
        const fecha_hora = new Date().toISOString();

        if (!email || !nombre || !comentario) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }

        const contacto = { email, nombre, comentario, ip, fecha_hora };
        this.contactosModel.saveContacto(contacto, (err, id) => {
            if (err) {
                res.status(500).send('Error al guardar el contacto.');
            } else {
                res.send(`Contacto guardado con éxito. ID: ${id}`);
            }
        });
    }

    get(req, res) {
        this.contactosModel.getContactos((err, contactos) => {
            if (err) {
                res.status(500).send('Error al recuperar los contactos.');
            } else {
                res.render('contactos', { contactos: contactos });
            }
        });
    }
}

module.exports = ContactosController;
