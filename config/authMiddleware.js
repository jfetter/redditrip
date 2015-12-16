'use strict'

var jwt = require('jwt-simple');
var User = require("../models/user");


module.exports = function(req, res, next) {
<<<<<<< HEAD
	if(!req.headers.authorization) return res.status(401).send('authorization error');
	var token = req.headers.authorization.split('Bearer ')[1];
	try{
		var decoded = jwt.decode(token, process.env.JWT_SECRET);
	} catch(err) {
		console.log("decoding error", err);
		return res.status(401).send('authorization error');
	}
	User.findOne({_id: decoded}, function(err, user){
		if(err || !user) return res.status(401).send('authorization error');
		req.userId =  user._id;
		next();
	})
}
=======
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
>>>>>>> 1a3842695a2b2bf8d11e7c755b109f7ebab3adc6
