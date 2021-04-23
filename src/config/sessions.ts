import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';


const redisClient = redis.createClient();

const RedisStore = connectRedis(session);

const sessionConfig = session({
  name: 'gid',
  secret: process.env.ACCESS_SECRET || 'some secret',
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({client: redisClient}), 
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 24
  }
})

export default sessionConfig;