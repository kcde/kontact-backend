import userDoc from '../models/user/user.mongo';
export async function doesEmailExist(email: string) {
  const user = await userDoc.findOne({ email: email });

  if (user == null) {
    return false;
  }

  return true;
}
