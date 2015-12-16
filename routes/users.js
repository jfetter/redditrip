var express = require('express');
var router = express.Router();
var User = require("../models/user");

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find({}, function(err, allUsers){
		res.status( err ? 400 : 200).send( err || allUsers)
	})
});

router.get('/deleteAll', function(req, res, next) {
	User.remove({}, function(err){
		res.send( err ? 400 : 200)
	})
});


router.post("/", function(req, res, next){
	User.register(req.body, function(err, newUser){
		res.status( err ? 400 : 200).send( err || newUser)
	})
})

router.post("/login", function(req, res, next){
	var loginUser = req.body;
	User.authenticate(loginUser, function(err, authorization){
		res.status(err ? 400 : 200).set("Authorization", `Bearer ${authorization}`).send(err || "ok")
	})
})


module.exports = router;
