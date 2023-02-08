import express, { RequestHandler, Request, Response } from 'express';
import helmet from 'helmet';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const hello: RequestHandler = (req, res) => {
  res.status(200).send('Hola mundo 🌎!');
};

const time = (req: Request, res: Response) => {
  const currentTime = new Date().toLocaleString('es', {
    timeZone: 'America/Miquelon',
  });
  res.status(200).send(`🕖${currentTime}`);
};

app.get('/', hello);
app.get('/time', time);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server corriendo, puerto:${PORT}`);
});
