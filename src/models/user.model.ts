// models/user.ts
import { Schema, model, Document } from 'mongoose';
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  nickname?: string;
  bio?: string;
  salt?: string;
  instructors?: string;
}

const UserSchema = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
});

export { UserSchema, IUser };

