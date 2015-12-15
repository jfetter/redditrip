var express = require('express');
var router = express.Router();
var User = require("../models/user");

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find({}, function(err, allUsers){
  res.send(allUsers);
	})
});

router.get('/deleteAll', function(req, res, next) {
	User.remove({}, function(err){
		res.send( err ? 400 : 200)
	})
});


router.post("/", function(req, res, next){
	User.addNewUser(req.body, function(err, newUser){
		res.status( err ? 400 : 200).send( err || newUser)
	})
})


module.exports = router;
