import dotenv from 'dotenv';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

const app: express.Application = express();
dotenv.config();
const PORT = 3456;
import userStore from './models/user/user.model';

const { MONGO_URL } = process.env;

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

  console.log(`App running on port   ${PORT}`);
});

dotenv.config();
