import { Router } from 'express';

import {
  createUser,
  getUserByIndex,
  getUsers,
} from '../controllers/users.controller';

const router = Router();

router.post('/', createUser);

router.get('/', getUsers);

router.get('/:index', getUserByIndex);

export default router;
