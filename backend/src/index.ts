import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { PORT } from './config/environments';
import DB from './database';
import errorHandler from './middleware/errorHandler';

import routes from './routes/index';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/', routes);

app.use(errorHandler);

const init = async () => {
  await DB.sequelize.sync({ force: false, alter: true });
  app.listen(PORT, () => {
    console.log(`🚀 Server corriendo, puerto:${PORT}`);
  });
};

init();
