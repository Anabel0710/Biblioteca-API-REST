import { pool } from './database.js';
class LibroController {
    // obtenemos todo lo que tengamos en la BD con el metodo "getAll"
    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    // obtenemos los datos de un registro a partir del id
    async getOne(req, res) {
        const libro = req.body;
        const id_libro = parseInt(libro.id);
        const [result] = await pool.query(`SELECT * FROM libros WHERE id=(?)`, [id_libro]);

        // si el id coincide con la bd, muestra los datos, caso contrario, muestra un error
        if (result[0] != undefined) {
            res.json(result);
        } else {
            res.json({ "Error": "Ups, no se ha encontrado el ID del libro" });
        }
    }

    async create(req, res) {
        try {
            const { nombre, autor, categoria, isbn } = req.body;
            const añoPublicacion = req.body['año-publicacion']; // Accedemos a la propiedad con corchetes

            const sql = 'INSERT INTO Libros (nombre, autor, categoria, año_publicacion, isbn) VALUES (?, ?, ?, ?, ?)';
            const values = [nombre, autor, categoria, añoPublicacion, isbn]; // Usamos la variable creada

            await pool.query(sql, values);

            res.status(201).json({ message: 'Libro agregado con éxito' });
        } catch (error) {
            console.error("Error al agregar el libro:", error);
            res.status(500).json({ error: "Error al agregar el libro" });
        }
    }
}

export const libro = new LibroController();