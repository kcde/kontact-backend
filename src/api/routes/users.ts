import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser
} from '../../controllers/users.controller';
const users = Router();

users.get('/', getAllUsers);
users.get('/:email', getUser);
users.post('/', createUser);
users.delete('/', deleteUser);

export default users;
