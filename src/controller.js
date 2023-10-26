import { pool } from './database.js';

class LibroController {
    async getAll(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            res.json(result);
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrió un error al obtener los libros" });
        }
    }

    async getOne(req, res) {
        try {
            const isbn = req.params.isbn;
            const [result] = await pool.query('SELECT * FROM libros WHERE isbn = ?', [isbn]);

            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).json({ "Error": `Ups, no se ha encontrado el ISBN ${isbn}` });
            }
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrió un error al obtener el libro" });
        }
    }

    async add(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query('INSERT INTO libros (nombre, autor, categoria, añoPublicacion, isbn) VALUES (?, ?, ?, ?, ?)', [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.isbn]);
            res.json({ "Id insertado": result.insertId, "message": "Libro agregado con éxito" });
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrió un error al agregar el libro" });
        }
    }

    async deleteISBN(req, res) {
        try {
            const isbn = req.params.isbn;
            const [result] = await pool.query('DELETE FROM libros WHERE isbn = ?', [isbn]);

            if (result.affectedRows > 0) {
                res.json({ "message": `Libro con ISBN ${isbn} eliminado exitosamente` });
            } else {
                res.status(404).json({ "Error": `No se encontró ningún libro con el ISBN ${isbn}` });
            }
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrió un error al eliminar el libro" });
        }
    }

    async deleteID(req, res) {
        try {
            const id = req.params.id;
            const [result] = await pool.query('DELETE FROM libros WHERE id = ?', [id]);

            if (result.affectedRows > 0) {
                res.json({ "message": `Libro con ID ${id} eliminado exitosamente` });
            } else {
                res.status(404).json({ "Error": `No se encontró ningún libro con el ID ${id}` });
            }
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrió un error al eliminar el libro" });
        }
    }

    async update(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query('UPDATE libros SET nombre = ?, autor = ?, categoria = ?, añoPublicacion = ? WHERE isbn = ?', [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.isbn]);

            if (result.affectedRows > 0) {
                res.json({ "message": `Libro con ISBN ${libro.isbn} actualizado exitosamente` });
            } else {
                res.status(404).json({ "Error": `No se encontró ningún libro con el ISBN ${libro.isbn}` });
            }
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrió un error al actualizar el libro" });
        }
    }
}

export const libroController = new LibroController();
