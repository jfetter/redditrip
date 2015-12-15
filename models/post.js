"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jwt = require('jwt-simple');

var Post;

var postSchema = Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	title: {type: String, required: true},
	content: {type: String, required: true},
	comments: {type: String, required: true}, //WILL BE MONGOID LATER
	time: {type: Date, required: true},
	score: {type: Number, required: true}
})

Post = mongoose.model("Post", postSchema)
module.exports = Post;