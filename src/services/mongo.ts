import mongoose, { ConnectOptions } from 'mongoose';
const { MONGO_URL } = process.env;

export async function connectMongo(): Promise<void> {
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

    console.log('unable to connect to mongo');
  }
}

export async function disconnectMongo(): Promise<void> {
  try {
    await mongoose.disconnect();
  } catch (err) {
    console.log('Unable to disconnect mongo');
    console.log(err);
  }
}
