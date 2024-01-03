import { createConnection, ConnectOptions } from 'mongoose';
import { mongodbUrl } from '../config/env';
// import { courseSchema, ICourse } from '../models/courseHierarchy.model';
// import { courseTagSchema, ICourseTagModel } from '../models/courseTag.model';
// import { orderSchema, IOrderModel } from '../models/order.model';
// import { orderDetailsSchema, IOrderDetailsModel } from '../models/orderDetails.model';
// import { platformCouponsSchema, IPlatformCouponsModel } from '../models/platformCoupons.model';
// import { shoppingCartSchema, IShoppingCartModel } from '../models/shoppingCart.model';
// import {
//   subchapterProgressSchema,
//   ISubchapterProgressModel,
// } from '../models/subchapterProgress.model';
import { UserSchema, UserDocument} from '../models/user.model';

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

export {
  // CourseHierarchy,
  // CourseTag,
  // Order,
  // OrderDetails,
  // PlatformCoupons,
  // ShoppingCart,
  // SubchapterProgress,
  User,
};
