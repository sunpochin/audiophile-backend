// models/user.ts
import { Schema, model, Document } from 'mongoose';
import mongoose from 'mongoose';
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

// const UserSchema = model<UserDocument>('User', userSchema);
// const User = mongoose.model('User', userSchema);

export { UserSchema, UserDocument };



// // ref:
// // https://buddy.works/tutorials/testing-with-jest-password-authentication-in-mongoose-model
// // https://github.com/ioveasdkre/HexschoolOperation/blob/main/NodejsEnterpriseClass/day40-tasks/day25/userModel.ts

// import mongoose from 'mongoose';
// import crypto from 'crypto';

// interface IUser {
//   name: string;
//   email: string;
//   password: string;
//   nickname?: string;
//   bio?: string;
//   salt?: string;
//   instructors?: string;
// }

// const UserSchema = new mongoose.Schema<IUser>({
//   name: {
//     type: String,
//     required: [true, 'name is required'],
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     // unique: 'email already exists',
//     // match: [ /. +\@. +\.. + /, 'Please give a valid email address'],
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   nickname: {
//     type: String,
//   },
//   bio: {
//     type: String,
//   },
//   salt: {
//     type: String,
//   },
//   instructors: {
//     type: String,
//   },
// });

// UserSchema.statics.generateSalt = function () {
//   return Math.round(new Date().valueOf() * Math.random()) + '';
// };

// UserSchema.statics.generateHash = function (password: string, salt: string) {
//   try {
//     const hmac = crypto.createHmac('sha1', salt);
//     hmac.update(password);
//     return hmac.digest('hex');
//   } catch (err) {
//     return err;
//   }
// };

// UserSchema.virtual('passwordvir')
//   .set(function (password: string) {
//     // set password as virtual field
//     // @ts-ignore
//     this._password = password;
//     // @ts-ignore
//     this.salt = this.constructor.generateSalt();
//     // @ts-ignore
//     this.hashed_password = this.constructor.generateHash(password, this.salt);
//   })
//   .get(function () {
//     // @ts-ignore
//     return this._password;
//   });

// // module.exports = mongoose.model('User', UserSchema);
// export { UserSchema, IUser };
