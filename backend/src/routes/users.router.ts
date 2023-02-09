import { Router } from 'express';

import {
  createUser,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
} from '../controllers/users.controller';

const router = Router();

router.post('/', createUser);

router.get('/', getUsers);

router.patch('/:id', updateUserById);

router.delete('/:id', deleteUserById);

router.get('/:id', getUserById);

export default router;
