import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
import { config } from 'dotenv';
import dotenvExpand from 'dotenv-expand';

dotenvExpand(config());

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({client: redisClient}),
  cookie: {
    maxAge: 1000 * 60 * 24
  }
}))

app.listen(process.env.HTTP_PORT || 3003);