/**
 * Created by Puneeth Thimmoji Somasekhara on 1/30/17.
 */
const localStrategy = require('passport-local');
const userModel = require('../models/user');
const passport = require('passport');
const localOptions = {
  usernameField: 'email'
};
const localLogin = new localStrategy(localOptions, function(email, password, done){
  userModel.findOne({email:email}, function(err, usr){
    if(err){
      return done(err)
    }
    if(!usr) {
      return done(null, false)
    }
    usr.comparePassword(password, function(err, isMatch){
      if(err){
        return done(err)
      }
      if(!isMatch){
        return done(null, false)
      }
      return done(null, usr)
    })
  })
});

passport.use(localLogin);