"use strict";

var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require("chai-http");
var User = require("../../models/user");
var app = require("../../app");

chai.use(chaiHttp)


	// var newUser = {username: "Amber Brown", password: "123", confirmPass: "123"};
	// // console.log('User', User.addNewUser)
	// // console.log('test',User.addNewUser())
	// User.addNewUser(newUser, function(err, savedUser){	})



module.exports = function(){

	describe("posts route", function(){
		var newPost = {};
		newPost.user = "Abner"; 
		newPost.title = "Amazing Post";
		newPost.score = 0;
		newPost.comments = "I'm not a crayon yo"
		newPost.time = Date.now();
		newPost.content = "a link";

		describe('delete all to posts', function(){
			it('should delete all posts', function(done){
				chai.request(app)
				.get("/posts/deleteAll")
				.end(function(err, res){
					console.log("after delete", err,res.body)
					expect(res).to.have.status(200);
					chai.request(app)
					.get("/posts")
					.end(function(err, res){
						console.log("checking delete", err,res.body)
						expect(res.body.length).to.equal(0);
						done()
					})
				})
			})
		})
		describe("post a post to the posts", function(){
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
		describe("get all posts", function(){
			it("should get alll the posts", function(done){
				chai.request(app)
				.get("/posts")
				.end(function(err, res){
					expect(res).to.have.status(200);
					expect(res.body[0]._id).to.be.ok
					expect(res.body[0].title).to.equal(newPost.title)
					expect(res.body[0].user).to.equal(newPost.user)
					expect(res.body[0].score).to.equal(newPost.score)
					expect(res.body[0].comments).to.equal(newPost.comments)
					expect(res.body[0].time).to.equal(newPost.time)
					expect(res.body[0].content).to.equal(newPost.content)
					done()
				})
			})
		})
	})
}