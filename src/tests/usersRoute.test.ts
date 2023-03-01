import request from 'supertest';
import { server } from '../server';
import { connectMongo, disconnectMongo } from '../services/mongo';
describe('Test /users route', () => {
  beforeAll(async (): Promise<void> => {
    await connectMongo();
  });

  afterAll(async (): Promise<void> => {
    await disconnectMongo();
    server.close();
  });
  test('It should create a new user when on POST  /api/users', async (): Promise<void> => {
    const response = await request(server).post('/api/users').send({
      fname: 'keside',
      lname: 'ezeala',
      email: 'keside@gmail.com',
      password: 'password'
    });

    expect(response.status).toBe(201);
  });
  test('It should return 400 bad request on POST  /api/users', async (): Promise<void> => {
    const response = await request(server).post('/api/users').send({
      fname: '',
      lname: 'ezeala',
      email: 'keside@gmail.com',
      password: 'password'
    });

    expect(response.status).toBe(400);
  });
});
