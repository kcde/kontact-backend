import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { User } from '../models/user/user.type';
import userStore from '../models/user/user.model';
import bcrypt from 'bcrypt';
dotenv.config();

const { SALT_ROUNDS } = process.env;

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

  //hash user password

  try {
    const hashedPassword: string = await bcrypt.hash(
      userInfo.password,
      Number(SALT_ROUNDS as unknown as number)
    );
    userInfo.password = hashedPassword;
  } catch (error) {
    console.log('unable to hash password');
    console.error(error);
    return res.status(500).json({ error: 'Unable to save user' });
  }

  //create user
  try {
    const newUser = await userStore.create(userInfo);

    return res.status(201).json(newUser);
  } catch (error) {
    console.log('unable to create new user');
    return res.status(400).json('error');
  }
}

export async function deleteUser(req: Request, res: Response) {
  const email: string = req.body.email as unknown as string;

  //check if email is provided
  if (!email) {
    return res.status(400).json({ error: 'please provide user email' });
  }

  try {
    await userStore.delete(email);
  } catch (err) {
    console.log(err);
    res.json({ error: 'Unable to delete user' });
  } finally {
    res.json({ success: true });
  }
}
