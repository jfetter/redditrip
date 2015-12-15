"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jwt = require('jwt-simple');

var User;

var userSchema = Schema({
	username: {type: String, required: true},
	password: {type: String, required: true}
})

userSchema.statics.addNewUser = function(newUser, cb){
	if (newUser.password !== newUser.confirmPass) {
		cb('passwords do not match');
		return
	}
	User.findOne({username: newUser.username}, function(err, foundUser){
		if (err) {
			cb('something mongoose went wrong', null)
			return 
		}
		if (foundUser) {
			cb('username already taken!', null)
			return 
		}

		User.create(newUser, function(err, user){
			if (err) {
				cb('error creating new user', null)
				return
			}
			cb(null, user)
		})
	})

}

User = mongoose.model("User", userSchema)
module.exports = User;