const sqlite3 = require('sqlite3').verbose();
const dbPath = process.env.DATABASE_PATH || './contactos.db';

class ContactosModel {
    constructor() {
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error al conectar con la base de datos:', err.message);
            } else {
                console.log('Conectado a la base de datos SQLite.');
            }
        });
        this._createTable();
    }

    _createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS contactos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            nombre TEXT NOT NULL,
            comentario TEXT NOT NULL,
            ip TEXT NOT NULL,
            fecha_hora TEXT NOT NULL
        )`;
        this.db.run(sql, (err) => {
            if (err) {
                console.error('Error al crear la tabla:', err.message);
            }
        });
    }

    saveContacto(contacto, callback) {
        const { email, nombre, comentario, ip, fecha_hora } = contacto;
        const sql = `INSERT INTO contactos (email, nombre, comentario, ip, fecha_hora) VALUES (?, ?, ?, ?, ?)`;
        this.db.run(sql, [email, nombre, comentario, ip, fecha_hora], function (err) {
            if (err) {
                console.error('Error al guardar el contacto:', err.message);
                callback(err);
            } else {
                callback(null, this.lastID);
            }
        });
    }

    getContactos(callback) {
        const sql = `SELECT * FROM contactos`;
        this.db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Error al recuperar los contactos:', err.message);
                callback(err);
            } else {
                callback(null, rows);
            }
        });
    }
}

module.exports = ContactosModel;
