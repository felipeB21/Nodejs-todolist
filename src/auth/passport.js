const passport = require("passport");
const passportJwt = require("passport-jwt");
const User = require("../database/models/User");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new StrategyJwt(opts, function (jwtPayload, done) {
    User.findOne({ where: { id: jwtPayload.id } })
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);
