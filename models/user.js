/**
 * Created by Puneeth Thimmoji Somasekhara on 1/28/17.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

//Define a model
const userSchema = new Schema({
  email : {type: 'String', unique: true, lowerCase: true},
  password: {type: 'String'}
});


//before saving the user into db, call this function
userSchema.pre('save', function(next) {
  const user = this;
  //generate the salt
  bcrypt.genSalt(10, function(err, salt) {
    if(err){
      return next(err)
    }
    //once salt is generated, encrypt your password with salt
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) {
        return next(err);
      }
      //override the password with generated salt
      user.password = hash;

      //call the next middleware in the chain
      next();
    })
  })

});

userSchema.methods.comparePassword = function(candidatePassword, cb){
 bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
   if(err){
     return cb(err)
   }
   cb(null, isMatch);
 })
};

//Create a Model[creates user collection]
const userModel = mongoose.model('user', userSchema);

//export the model
module.exports = userModel;
