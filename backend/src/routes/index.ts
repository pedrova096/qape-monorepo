import { Router } from 'express';
import userRoute from './users.router';
import authRoute from './auth.router';
import authJWT from '../middleware/authJWT';

const routes = Router();

routes.use('/users', authJWT, userRoute);
routes.use('/auth', authRoute);

export default routes;
