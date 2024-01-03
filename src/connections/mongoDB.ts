import { createConnection, ConnectOptions } from 'mongoose';
import { mongodbUrl } from '../config/env';
// import { courseSchema, ICourse } from '../models/courseHierarchy.model';
// import {
//   subchapterProgressSchema,
//   ISubchapterProgressModel,
// } from '../models/subchapterProgress.model';
import { UserSchema, UserDocument} from '../models/user.model';
import { CartSchema, CartDocument} from '../models/cart.model';

console.log("mongodbUrl: ", mongodbUrl);
const MongoDB = createConnection(mongodbUrl as string, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
} as ConnectOptions);

MongoDB.once('open', () => {
  console.log('MongoDB connected!');
});

MongoDB.on('error', err => {
  console.error('MongoDB connection error:', err);
});
// const ShoppingCart = MongoDB.model<IShoppingCartModel>('ShoppingCart', shoppingCartSchema);
// const SubchapterProgress = MongoDB.model<ISubchapterProgressModel>(
//   'SubchapterProgress',
//   subchapterProgressSchema,
// );
const User = MongoDB.model<UserDocument>('User', UserSchema);
const Cart = MongoDB.model<CartDocument>('Cart', CartSchema);

export {
  // Order,
  // OrderDetails,
  User,
  Cart,
};
