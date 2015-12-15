"use strict";

var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require("chai-http");
var User = require("../../models/user");

var newUser = {username: "Amber Brown", password: "123", confirmPass: "123"};
function storeUser(user){
	newUser = user
}
chai.use(chaiHttp)

var app = require("../../app");

module.exports = function(){
	User.addNewUser(newUser, function(err, savedUser){

		console.log('saved USer !!', savedUser)

		describe("posts route", function(){
			var newPost = {};
			newPost.user = savedUser._id; 
			newPost.title = "Amazing Post";
			newPost.score = 0;
			newPost.comments = ["I'm not a crayon yo"];
			newPost.time = Date.now();
			newPost.content = "a link";

			describe("get all posts", function(){
				it("should get alll the posts", function(done){
					chai.request(app)
					.get("/posts")
					.end(function(err, res){
						expect(res).to.have.status(200);
						done()
					})
				})
			})
			describe("post a post to the posts", function(){
				console.log(newPost)
				it("should post a post", function(done){
					chai.request(app)
					.post("/posts")
					.send(newPost)
					.end(function(err, res){
						expect(res).to.have.status(200);
						expect(res.body._id).to.be.ok
						expect(res.body.title).to.equal(newPost.title)
						expect(res.body.user).to.equal(newPost.user)
						expect(res.body.score).to.equal(newPost.score)
						expect(res.body.comments).to.equal(newPost.comments)
						expect(res.body.time).to.equal(newPost.time)
						expect(res.body.content).to.equal(newPost.content)
						done()
					})
				})
			})
		})

	})
}