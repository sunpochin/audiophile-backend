// models/user.ts
import { Schema, model, Document } from 'mongoose';
interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  nickname?: string;
  bio?: string;
  salt?: string;
  instructors?: string;
}

const UserSchema = new Schema<UserDocument>({
  name: String,
  email: String,
  password: String,
});

export { UserSchema, UserDocument };

