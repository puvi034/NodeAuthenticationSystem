/**
 * Created by Puneeth Thimmoji Somasekhara on 1/28/17.
 */
const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function getUserToken(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub:user.id, iat: timestamp}, config.SECRET_KEY);
}
exports.signIn = function(req,res,next){
  res.send({
    token: getUserToken(req.user)
  })
};
exports.signUp = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
    return res.status(422).send({error: "You should provide both username and password"});
  }

  //check if given email already exist in database
  User.findOne({email: email}, function (err, usr, next) {

    //If error in db, pass it to next middleware in pipe
    if (err) {
      return next(err);
    }

    //if user already exist, respond with an error
    if (usr) {
      return res.status(422).send({
        error: "Email is in use. Cannot be processed"
      })
    }

    //if user does not exist, save and response with success message;
    const newUser = new User({
      email: email,
      password: password
    });

    newUser.save(function (err) {
      if (err) {
        return next(err)
      }
      const token = getUserToken(newUser);
      return res.status(200).send({
        token: token
      });
    });
  })
}