<<<<<<< HEAD
'use strict';

var cp = require('child_process');
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

var app = require('../../app');
var User = require('../../models/user');

var dbName = process.env.MONGO_URL.split('/').pop();

var cleanDb = function(done) {
  cp.execFile('./clean-db.sh', [dbName], {cwd: __dirname + '/../scripts/'}, function(){
		done();
  });
};

var newUser = {username: "Captain Falcon", password: "123", confirmPass: "123"};
var badPwUser = {username: "Marsh", password: "124", confirmPass: "123"};
var badUnameUser = {username: "Captain Falcon", password: "123", confirmPass: "123"};

describe("users route", function(){
	describe("get to users", function(){
		beforeEach(cleanDb);
		it("should return all users", function(done){
			chai.request(app)
			.get("/users")
			.end(function(err, res){
				expect(res).to.have.status(200);
        expect(res.body).to.have.length(2);
				done();
			})
		})
	})
	describe("post to users", function(){
		beforeEach(cleanDb);
		it("should add a new user", function(done){
			chai.request(app)
			.post("/users")
			.send(newUser)
			.end(function(err, res){
				var savedUser = res.body
				expect(res).to.have.status(200);
				expect(res.body.username).to.equal(savedUser.username);
				expect(res.body.password).to.be.null
				expect(res.body._id).to.be.ok;
				done()
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
				done()
			})
		})
	})
	describe("post to login", function(){
		it("should return a token", function(done){
			console.log("LOGING IN USER: ", newUser);
			chai.request(app)
			.post("/users/login")
			.send({username: newUser.username, password: newUser.password})
			.end(function(err, res){
				expect(res).to.have.status(200);
				expect(res.headers.authorization).to.be.ok
				done();
			})
		})
	})
})
=======
"use strict";

var chai = require("chai");
var expect = chai.expect
var chaiHttp = require("chai-http")
var bcrypt = require('bcrypt');

chai.use(chaiHttp)

var app = require("../../app");

module.exports = function(next) {
	// USERS
	var authToken;
	var newUser = {username: "Captain Falcon", password: "123", confirmPass: "123"};
 	var badPwUser = {username: "Marsh", password: "124", confirmPass: "123"};
 	var badUnameUser = {username: "Captain Falcon", password: "123", confirmPass: "123"};
	describe("users route", function(){

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
					newUser = res.body
					expect(res).to.have.status(200);
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
					done()
				})
			})
		})
		describe("post to login", function(){
			it("should return a token", function(done){
				chai.request(app)
				.post("/users/login")
				.send({username: newUser.username, password: newUser.password})
				.end(function(err, res){
					expect(res.headers.authorization).to.be.ok
					done();
					next();
				})
			})
		})
	})
}




>>>>>>> 1a3842695a2b2bf8d11e7c755b109f7ebab3adc6
