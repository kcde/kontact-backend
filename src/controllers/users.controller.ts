import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { User } from '../models/user/user.type';
import userStore from '../models/user/user.model';
import bcrypt from 'bcrypt';
import { doesEmailExist } from '../services/userServices';
import userDoc from '../models/user/user.mongo';

dotenv.config();

const { SALT_ROUNDS } = process.env;

export async function getUser(req: Request, res: Response) {
  const email: string = req.params.email as unknown as string;
  //check if email is provided
  if (!email) {
    return res
      .status(400)
      .json({ error: 'please provide user email and password' });
  }

  try {
    const user = await userStore.read(email);
    if (user.length) {
      return res.json(user);
    }
    return res.status(404).json({ error: 'user not found' });
  } catch (err) {
    return res.status(500).json({ error: 'unable to get all users' });
  }
}
export async function getAllUsers(_req: Request, res: Response) {
  try {
    const users = await userStore.readAll();

    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: 'unable to get all users' });
  }
}

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

  //check if a user is registered with the email

  try {
    const emailStatus: boolean = await doesEmailExist(userInfo.email);

    if (emailStatus) {
      return res.status(400).json({ error: 'User with this email exists' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Unable to perform an email check ' });
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
  const password: string = req.body.password as unknown as string;

  //check if email is provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: 'please provide user email and password' });
  }

  //check if a user is registered with the email

  try {
    const emailStatus: boolean = await doesEmailExist(email);

    if (!emailStatus) {
      return res.status(400).json({ error: 'No valid user with this email' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Unable to perform an email check ' });
  }

  //check if password is correct
  try {
    const user = await userDoc.find({ email: email });
    const hashedPassword = user[0].password;

    const doesPasswordMatch = await bcrypt.compare(password, hashedPassword);
    console.log(password);

    console.log(doesPasswordMatch);

    if (!doesPasswordMatch) {
      return res.status(400).json({ error: 'invalid username and password' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Unable to verify password' });
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
