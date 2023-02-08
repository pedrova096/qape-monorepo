import { Router } from 'express';
import userRoute from './users.router';

const routes = Router();

routes.use('/users', userRoute);

export default routes;
