import mongoose, { Schema } from 'mongoose';
import { User } from './user.type';

const userSchema = new Schema<User>({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

export default mongoose.model('user', userSchema);
