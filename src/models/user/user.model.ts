import userDoc from './user.mongo';
import { User } from './user.type';

const userStore = {
  readAll: async (): Promise<User[]> => {
    const allUsers = await userDoc.find(
      {},
      {
        password: 0,
        __v: 0,
        _id: 0
      }
    );
    return allUsers;
  },
  read: async (email: string): Promise<User[]> => {
    const user = await userDoc.find(
      { email: email },
      {
        password: 0,
        __v: 0,
        _id: 0
      }
    );
    return user;
  },
  create: async (user: User): Promise<User> => {
    const newUser = await userDoc.create(user);
    return newUser;
  },
  //update: () => {},
  delete: async (email: string) => {
    return await userDoc.deleteOne({ email: email });
  }
};

export default userStore;
