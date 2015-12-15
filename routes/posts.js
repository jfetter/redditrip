var express = require('express');
var router = express.Router();
var Post = require("../models/post")

/* GET home page. */
router.get('/', function(req, res, next) {
	Post.find({}, function(err, posts){
		res.status( err ? 400 : 200 ).send(err || posts)
	})
});

router.post("/", function(req, res, next){
	Post.create(req.body, function(err, post){
		res.status(err ? 400: 200).send(err || post)
	})
})

router.get("/deleteAll", function(req, res, next){
	Post.remove({}, function(err, _){
		res.status(err ? 400: 200).send(err || 'ok')
	})
})

module.exports = router;