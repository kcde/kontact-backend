import express, { Request, Response } from 'express';
import cors from 'cors';
import api from './api';
const app: express.Application = express();
const PORT = 3456;
import bodyParser from 'body-parser';
import { connectMongo } from './services/mongo';

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the the backend api for signup form');
});

app.use('/api', api);

export const server = app.listen(PORT, async () => {
  await connectMongo();

  console.log(`App running on  localhost:${PORT}`);
});
