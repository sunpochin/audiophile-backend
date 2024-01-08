// models/user.ts
// import { Schema, model, Document } from 'mongoose';
import mongoose from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password: string;
  nickname?: string;
  bio?: string;
  salt?: string;
  instructors?: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // unique: 'email already exists',
    // match: [ /. +\@. +\.. + /, 'Please give a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
  },
  bio: {
    type: String,
  },
  salt: {
    type: String,
  },
  instructors: {
    type: String,
  },
});

export { UserSchema, IUser };

