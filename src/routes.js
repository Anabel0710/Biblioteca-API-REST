import { Router } from 'express';
import { libro } from './controller.js';

export const router = Router()

router.get('/libros', libro.getAll);
router.get('/libro', libro.getOne);
router.post('/libro', libro.add);
router.delete('/libroisbn', libro.deleteisbn);
router.delete('/libroid', libro.deleteid);
router.put('/libro', libro.update);
