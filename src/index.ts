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

app.get('/', function (_req, res) {
  res.json('audiophile backend');
});

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // app.use(handle404Error);

// // app.use(handleErrors);

// // 補捉程式錯誤
// process.on('uncaughtException', handleUncaughtException);

// // 補捉未處理的 catch
// process.on('unhandledRejection', handleUnhandledRejection);

import http from 'http';
// import { port } from '../config/env';
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
