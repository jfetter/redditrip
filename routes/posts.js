var express = require('express');
var router = express.Router();
var Post = require("../models/post")
var authMiddleware = require('../config/authMiddleware');

/* GET home page. */
router.get('/', function(req, res, next) {
	Post.find({}, function(err, posts){
		res.status( err ? 400 : 200 ).send(err || posts)
	})
});

router.post("/", authMiddleware, function(req, res, next){
<<<<<<< HEAD
	if (req.userId != req.body.user) return res.status(401).send('error authorizing post')
=======
	console.log('IN ROUTE************',req.userId, req.body)
	// if (req.userId != req.body.user) return res.status(401).send('error authorizing post')
>>>>>>> 1a3842695a2b2bf8d11e7c755b109f7ebab3adc6
	Post.create(req.body, function(err, post){
		res.status(err ? 400: 200).send(err || post)
	})
})

router.get("/deleteAll", function(req, res, next){
	Post.remove({}, function(err, _){
		res.status(err ? 400: 200).send(err || 'ok')
	})
})

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 1a3842695a2b2bf8d11e7c755b109f7ebab3adc6
