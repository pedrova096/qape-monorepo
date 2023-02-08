import express from 'express';
import helmet from 'helmet';

import routes from './routes/index';

const app = express();
const PORT = 8080;

app.use(helmet());
app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`🚀 Server corriendo, puerto:${PORT}`);
});
