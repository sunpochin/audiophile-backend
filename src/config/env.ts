import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(path.resolve(process.cwd()), '.env') });

const port = process.env.PORT ?? 8000;
const env = process.env.ENV;
const mongodbUrl = process.env.MONGODB_URL;
const coverUrl = process.env.COVER_URL;
const coverParamsUrl = process.env.COVERPARAMS_URL;
const movieUrl = process.env.MOVIE_URL;
const jwtSecret = process.env.JWT_SECRET;
const merchantId = process.env.MERCHANTID;
const respondType = process.env.REPONDTYPE;
const version = process.env.VERSION;
const goldFlowHashKey = process.env.GOLDFLOWHASHKEY;
const goldFlowHashIv = process.env.GOLDFLOWHASHIV;
const goldFlowalgorithm = process.env.GOLDFLOWHALGORITHM;
const orderSalt = process.env.ORDERSALT;
const orderHasKey = process.env.ORDERHASHKEY;
const orderHasIv = process.env.ORDERHASHIV;
const orderalgorithm = process.env.ORDERALGORITHM;

if (!mongodbUrl) throw new Error('在環境變量中找不到 testPetknow 數據庫連接字符串');

if (!coverUrl || !coverParamsUrl) throw new Error('在環境變量中找不到 coverUrl 或 coverParamsUrl');

if (!jwtSecret) throw new Error('在環境變量中找不到 JWT_SECRET');

if (!goldFlowHashKey || !goldFlowHashIv || !goldFlowalgorithm)
  throw new Error('在環境變量中找不到 GoldFlowHashKey 或 GoldFlowHashIv 或 goldFlowalgorithm');

if (!orderSalt || !orderHasKey || !orderHasIv || !orderalgorithm)
  throw new Error('在環境變量中找不到 orderSalt 或 orderHasKey 或 orderHasIv 或 orderalgorithm');

if (!movieUrl) throw new Error('在環境變量中找不到 movieUrl');

export {
  port,
  env,
  mongodbUrl,
  coverUrl,
  coverParamsUrl,
  movieUrl,
  jwtSecret,
  merchantId,
  respondType,
  version,
  goldFlowHashKey,
  goldFlowHashIv,
  goldFlowalgorithm,
  orderSalt,
  orderHasKey,
  orderHasIv,
  orderalgorithm,
};
