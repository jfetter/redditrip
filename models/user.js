"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');

var User;

var userSchema = Schema({
	username: {type: String, required: true},
	password: {type: String, required: true}
})

userSchema.statics.authenticate = function(user, cb){
	User.findOne({username: user.username}, function(err, foundUser){
 	 if (err || !foundUser) return cb(err || "incorrect username or password")
 	 bcrypt.compare( user.password, foundUser.password, function(err, isGood){
 	 	if (err || !isGood) return cb(err || "invalid password or username")
	 	var token= jwt.encode(foundUser._id, process.env.JWT_SECRET)
	 	cb(null, token)
 	 })
	})
}

userSchema.statics.addNewUser = function(newUser, cb){
	console.log('cool shit', newUser);
	let username = newUser.username;
	let password = newUser.password;
	let confirmPass = newUser.confirmPass;
	if (password !== confirmPass) {
		cb('passwords do not match');
		return
	}
	User.findOne({username: username}, function(err, foundUser){
		if (err) {
			cb(err, null)
			return 
		}
		if (foundUser) {
			cb('username already taken!', null)
			return 
		}
		bcrypt.genSalt(13, function(err1, salt) {
      bcrypt.hash(password, salt, function(err2, hash) {
        if(err1 || err2) return cb(err1 || err2);
        var newUser = new User();
        newUser.username = username;
        newUser.password = hash;
        newUser.save(function(err, savedUser){
          savedUser.password = null;
          cb(err, savedUser);
        });
      });
		})
	})

}

User = mongoose.model("User", userSchema)
module.exports = User;