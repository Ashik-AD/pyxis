import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import dotenv from 'dotenv';
dotenv.config();

import User from '../model/user.js';
const passportConfig = () => {
  const opt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ENCRYPT_SECRET,
  };

  passport.use(
    new JwtStrategy(opt, async (jwt_payload, done) => {
      const user = await User.findById(jwt_payload.sub);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    })
  );
};
export default passportConfig;
