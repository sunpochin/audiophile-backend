import { createConnection, ConnectOptions } from 'mongoose';
import { mongodbUrl } from '../config/env';
import { UserSchema, IUser} from '../models/user.model';
import { CartSchema, ICart} from '../models/cart.model';

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
const User = MongoDB.model<IUser>('User', UserSchema);
const Cart = MongoDB.model<ICart>('Cart', CartSchema);

export {
  // Order,
  // OrderDetails,
  User,
  Cart,
};
