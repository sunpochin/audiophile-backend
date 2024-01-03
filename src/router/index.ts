import { Router } from 'express';
// import { env } from '../config/env';
import { userRouter } from './user.router';
import { cartRouter } from './cart.router';

const apiRouter = Router();
// if (env !== 'prod') {
//   apiRouter.use(fakeInformationRouter);
// }

apiRouter.use(
  userRouter,
  cartRouter,
  // shoppingCartRouter,
);

export { apiRouter};
