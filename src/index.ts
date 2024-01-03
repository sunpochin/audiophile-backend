// ref:
// 1. https://auth0.com/blog/node-js-and-typescript-tutorial-build-a-crud-api/

import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import bodyParser from 'body-parser';

// import { setSecurityHeaders } from './config/contentSecurityPolicy';
// import { env } from './config/env';
import { apiRouter  } from './router/index';
// import {
//   handle404Error,
//   handleErrors,
//   handleUncaughtException,
//   handleUnhandledRejection,
// } from './middlewares/error.middleware';
// import swaggerSpec from '../swagger_output.json';

const app = express();

// setSecurityHeaders(app);
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.use(apiRouter);
// app.use('/items', itemsRouter);
// app.use('/api', itemsRouter);

app.get('/', function (_req, res) {
  res.json('audiophile');
});

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // app.use(handle404Error);

// // app.use(handleErrors);

// // 補捉程式錯誤
// process.on('uncaughtException', handleUncaughtException);

// // 補捉未處理的 catch
// process.on('unhandledRejection', handleUnhandledRejection);


import http from 'http';
import { createConnection, ConnectOptions } from 'mongoose';
import { mongodbUrl } from './config/env';

// import { port } from '../config/env';
const port = process.env.PORT || 3000;
const server = http.createServer(app);

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



server.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
