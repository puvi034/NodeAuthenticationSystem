/**
 * Created by Puneeth Thimmoji Somasekhara on 1/29/17.
 */
const userModel = require('../models/user');
const config = require('../config');
const jwtStrategy = require('passport-jwt').Strategy;
const extractToken = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const jwtOptions = {
  jwtFromRequest:extractToken.fromHeader('authorization'),
  secretOrKey: config.SECRET_KEY
};

const jwtLogin = new jwtStrategy(jwtOptions, function (payload, done) {
  userModel.findById(payload.sub, function (err, usr) {
    if (err) {
      done(err, false);
    }
    if (!usr) {
      done(null, false);
    }

    done(null, usr);
  })
});

passport.use(jwtLogin);
