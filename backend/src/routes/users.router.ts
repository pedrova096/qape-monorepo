import { Router } from 'express';

import {
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
} from '../controllers/users.controller';

const router = Router();

router.get('/', getUsers);

router.patch('/', updateUserById);

router.delete('/', deleteUserById);

router.get('/:id', getUserById);

export default router;
