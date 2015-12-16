'use strict'

var jwt = require('jwt-simple');
var User = require("../models/user");


module.exports = function(req, res, next) {
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
