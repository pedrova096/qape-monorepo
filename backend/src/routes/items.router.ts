import { Router } from 'express';
import {
  createItem,
  getItems,
  updateItemById,
  deleteItemById,
  getItemById,
  getItemsByUserId,
} from '../controllers/items.controller';
import authJWT from '../middleware/authJWT';

const router = Router();

router.get('/search', getItems);

router.get('/:id', getItemById);

router.post('/', authJWT, createItem);

router.patch('/:id', authJWT, updateItemById);

router.delete('/:id', authJWT, deleteItemById);

router.get('/', authJWT, getItemsByUserId);

export default router;
