'use strict';

var cp = require('child_process');
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

var app = require('../../app');
var User = require('../../models/user');
var Post = require('../../models/post');

var dbName = process.env.MONGO_URL.split('/').pop();


var testUser;
var authToken;

var cleanDb = function(done) {
  cp.execFile('./clean-db.sh', [dbName], {cwd: __dirname + '/../scripts/'}, function(){
		User.findById('0000000000000000000000a1', function(err, capt){
			testUser = capt;
			authToken = testUser.token();
			done();
		});
  });
};

describe("posts route", function(){
	var newPost = {};

	newPost.title = "Amazing Post";
	newPost.score = 0;
	newPost.comments = "I'm not a crayon yo"
	newPost.time = Date.now();
	newPost.content = "a link";
	//
	describe("post a post to the posts", function(){
		beforeEach(cleanDb);
		it("should post a post", function(done){
			newPost.user = testUser._id;
			chai.request(app)
			.post("/posts")
			.set("Authorization", "Bearer " + authToken)
			.send(newPost)
			.end(function(err, res){
				expect(res).to.have.status(200);
				expect(res.body._id).to.be.ok
				expect(res.body.title).to.equal(newPost.title)
				expect(res.body.user).to.equal(newPost.user.toString())
				expect(res.body.score).to.equal(newPost.score)
				expect(res.body.comments).to.equal(newPost.comments)
				expect(res.body.time).to.equal(newPost.time)
				expect(res.body.content).to.equal(newPost.content)
				done()
			})
		})
		it("should return an error", function(done){
			chai.request(app)
			.post("/posts")
			.send(newPost)
			.end(function(err, res){
				expect(res).to.have.status(401);
				done()
			})
		})
		it("should return an error", function(done){
			chai.request(app)
			.post("/posts")
			.send(newPost)
			.set("Authorization", "Bearer " + authToken + '1')
			.end(function(err, res){
				expect(res).to.have.status(401);
				done()
			})
		})
	})
	describe("get all posts", function(){
		beforeEach(cleanDb);
		it("should get alll the posts", function(done){
			chai.request(app)
			.get("/posts")
			.end(function(err, res){
				expect(res).to.have.status(200);
        expect(res.body).to.have.length(1);
        expect(res.body).is.ok
				done()
			})
		})
	})
})
