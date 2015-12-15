"use strict";

var chai = require("chai");
var expect = chai.expect
var chaiHttp = require("chai-http")



chai.use(chaiHttp)

var app = require("../../app");
// var User = require("../../models/User")

// var clearDb = function(done){
//   User.remove({}, function(err) {
//     done();
//   });
// };

// clearDb();

describe("users route", function(){
	var newUser = {username: "Captain Falcon", password: "123", confirmPass: "123"};
 	var badPwUser = {username: "Marsh", password: "124", confirmPass: "123"};
 	var badUnameUser = {username: "Captain Falcon", password: "123", confirmPass: "123"};

	describe("get to /users/deleteAll", function(){
		it("should delete all useres", function(done){
			chai.request(app)
			.get("/users/deleteAll")
			.end(function(err, res){
				expect(res).to.have.status(200);
				done()
			})
		})
	})
	describe("post to users", function(){
		it("should add a new user", function(done){
			chai.request(app)
			.post("/users")
			.send(newUser)
			.end(function(err, res){
				expect(res).to.have.status(200);
				console.log(res.body)
				expect(res.body.username).to.equal(newUser.username);
				expect(res.body._id).to.be.ok;
				done()
			})
		})
	})
	describe("get to users", function(){
		it("should return all users", function(done){
			chai.request(app)
				.get("/users")
				.end(function(err, res){
					expect(res).to.have.status(200);
					expect(res.body[0].username).to.equal(newUser.username)
					expect(res.body[0].password).to.equal(newUser.password)
					done();
				})
		})
	})
	describe("applicant passwords do not match", function(){
		it("should return 400", function(done){
			chai.request(app)
			.post("/users")
			.send(badPwUser)
			.end(function(err, res){
				expect(res).to.have.status(400);
				// expect(res).to.equal('applicant passwords do not match')
				done()
			})
		})
	})
	describe("applicant username is taken", function(){
		it("should return 400", function(done){
			chai.request(app)
			.post("/users")
			.send(badUnameUser)
			.end(function(err, res){
				expect(res).to.have.status(400);
				// expect(res).to.equal('applicant username is taken')
				done()
			})
		})
	})
	describe("post to login", function(){
		it("should return a token", function(done){
			chai.request(app)
			.post("/users")
			.send(badUnameUser)
			.end(function(err, res){
				expect(res).to.have.status(400);
				// expect(res).to.equal('applicant username is taken')
				done()
			})
		})
	})


})





