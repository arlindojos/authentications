import passport from 'passport';
import passportLocal from 'passport-local'
import findUser from '../entity/findUser';
import { isValidPassword } from '../lib/passwordUtils';

type Done = (error: any, user?: any, options?: passportLocal.IVerifyOptions | undefined) => void

const LocalStrategy = passportLocal.Strategy;


const verifyCallback = async (username: string, password: string, done: Done) => {
  const user = await findUser(username);
    
  if(!user) return done(null, false);

  const valid = await isValidPassword( password, user.password);

  if(valid) return done(null, user);

  done(null, false);
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);
