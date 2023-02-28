import { Router } from 'express';
import { createUser } from '../../controllers/users.controller';

const users = Router();

users.post('/', createUser);

export default users;
