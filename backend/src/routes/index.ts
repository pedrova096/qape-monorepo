import { Router } from 'express';
import userRoute from './users.router';
import authRoute from './auth.router';

const routes = Router();

routes.use('/users', userRoute);
routes.use('/auth', authRoute);

export default routes;
