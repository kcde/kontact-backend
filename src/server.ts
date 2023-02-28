import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import api from './api';
const app: express.Application = express();
dotenv.config();
const PORT = 3456;
import userStore from './models/user/user.model';
import bodyParser from 'body-parser';

const { MONGO_URL } = process.env;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the the backend api for signup form');
});

app.use('/api', api);

app.listen(PORT, async () => {
  try {
    mongoose.set('strictQuery', false);
    //connect mongoose
    await mongoose.connect(
      MONGO_URL as unknown as string,
      {
        useNewUrlParser: true
      } as ConnectOptions
    );

    console.log('mongo connected');
  } catch (error) {
    console.log(error);

    console.log('unable to ocnnect to mongo');
  }

  console.log(`App running on  localhost:${PORT}`);
});

dotenv.config();
