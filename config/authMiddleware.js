'use strict'

var jwt = require('jwt-simple');
var User = require("../models/user");


module.exports = function(req, res, next) {
	console.log('FINDING A USER WITH ID = token', req.headers)
	var token = req.headers.authorization.split('Bearer ')[1];
	console.log('FINDING A USER WITH ID = token', token)
	var decoded = jwt.decode(token, process.env.JWT_SECRET);
	console.log('FINDING A USER WITH ID = ', decoded)
	User.findOne({_id: decoded}, function(err, user){
		if(err || !user) return res.status(401).send('authorization error');
		console.log("FOUND A USER BITCH***********", user)
		req.userId =  user._id;
		next();
	})
}