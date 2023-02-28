import { Request, Response } from 'express';
import { User } from '../models/user/user.type';
import userStore from '../models/user/user.model';

export async function createUser(req: Request, res: Response) {
  const userInfo: User = {
    fname: req.body.fname as unknown as string,
    lname: req.body.lname as unknown as string,
    email: req.body.email as unknown as string,
    password: req.body.password as unknown as string
  };

  //check if all values are provided for signup
  for (const key in userInfo) {
    const item = userInfo[key as keyof User];
    if (!item) {
      return res.status(400).json({ error: `please provide ${key} value` });
    }
  }

  //create user

  try {
    const newUser = await userStore.create(userInfo);

    return res.status(201).json(newUser);
  } catch (error) {
    console.log('unable to create new user');
    return res.status(400).json('error');
  }

  res.json(req.body);
}
