/**
 * Created by Puneeth Thimmoji Somasekhara on 1/28/17.
 */
require('./PassportStrategies/jwtStrategy');
require('./PassportStrategies/localStrategy');

const authentication = require('./controllers/authentication');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignIn = passport.authenticate('local', {session: false});
module.exports = function (app) {
  app.get('/', requireAuth, function (req, res) {
    res.send({
      authenticated: true
    })
  });
  app.post('/signin', requireSignIn, authentication.signIn);
  app.post('/signup', authentication.signUp);
};