import { pool } from './database.js';
class LibroController {
    async getAll(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            res.json(result);
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrio un error al obtener los libros" });
        }
    }

    async getOne(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query(`SELECT * FROM libros WHERE isbn=?`, [libro.isbn]);
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).json({ "Error": "Ups, no se ha encontrado el ISBN ${libro.isbn}" });
            }
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrio un error al obtener los libros" });
        }
    }

    async add(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query('INSERT INTO Libros (nombre, autor, categoria, año_publicacion, isbn) VALUES (?, ?, ?, ?, ?)', [libro.nombre, libro.autor, libro.categoria, libro.añoPublicacion, libro.isbn]);
            res.json({ "Id insertado": result.insertid, "message": "Libro agregado con éxito" });
        } catch (error) {
            res.status(500).json("Ocurrio un error al agregar el libro")
        }
    }


    async deleteisbn(req, res){
        try {
            const libro = req.body;
            const[result] =  await pool.query('DELETE FROM libros WHERE ISBN=(?)', [libro.isbn]);
            if (result.affectesRows > 0){
                res.json({"message": 'Libro con ISBN $[libro.isbn] eliminado exitosamente'});
            }else {
                res.status(404).json({ "Error": "No se encontro nungun libro con el ISBN $[libro.isbn]" });
            }
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrio un error al eliminar el libro" });
        }
    }

    async deleteid(req, res){
        try {
            const libro = req.body;
            const[result] =  await pool.query('DELETE FROM libros WHERE id=(?)', [libro.ic]);
            if (result.affectesRows > 0){
                res.json({"message": 'Libro con ID $[libro.id] eliminado exitosamente'});
            }else {
                res.status(404).json({ "Error": "No se encontro nungun libro con el ID $[libro.id]" });
            }
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrio un error al eliminar el libro" });
        }
    }


    async update(req, res){
        try {
            const libro = req.body;
            const[result] =  await pool.query('UPDATE libros SET nombre - (?), autor - (?), categoria - (?), año_publicacion - (?), WHERE ISBN - (?)', [libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.isbn]);
            if (result.affectesRows > 0){
                res.json({"message": 'Libro con ISBN $[libro.isbn] actualizado exitosamente'});
            }else {
                res.status(404).json({ "Error": "No se encontro nungun libro con el ISBN $[libro.isbn]" });
            }
        } catch (error) {
            res.status(500).json({ "Error": "Ocurrio un error al actualizar el libro" });
        }
    }
}

export const libro = new LibroController();
