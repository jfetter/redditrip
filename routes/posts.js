var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	Post.find({}, function(err, posts){
		res.status( err ? 400 : 200 ).send(err || posts)
	})
});

module.exports = router;