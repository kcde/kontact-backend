import { Router } from 'express';
import { createUser, deleteUser } from '../../controllers/users.controller';
const users = Router();

users.get('/');
users.post('/', createUser);
users.delete('/', deleteUser);

export default users;
