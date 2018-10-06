import { Strategy, ExtractJwt } from 'passport-jwt';
import * as config from 'config';
import models from './models';
const passport = require('passport');

passport.initialize();
const SECRET = config.get('jwtSecret');

export default async function () {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: SECRET,
  };

  passport.use(new Strategy(opts, (jwt_payload, done) => {
    models.User.findOne({
      where: { id: jwt_payload.id },
      raw: true,
    }).then((user) => {
      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    }).catch((err) => {
      return done(err, false);
    });
  }));
}
