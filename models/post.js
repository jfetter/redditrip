"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jwt = require('jwt-simple');

var Post;

var postSchema = Schema({
<<<<<<< HEAD
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	title: {type: String, required: true},
=======
	// user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},

	title: {type: String, required: true},
	user: {type: String, required: true},
>>>>>>> 1a3842695a2b2bf8d11e7c755b109f7ebab3adc6
	content: {type: String, required: true},
	comments: {type: String, required: true}, //WILL BE MONGOID LATER
	time: {type: Number, required: true},
	score: {type: Number, required: true}
})

Post = mongoose.model("Post", postSchema)
<<<<<<< HEAD
module.exports = Post;
=======
module.exports = Post;
>>>>>>> 1a3842695a2b2bf8d11e7c755b109f7ebab3adc6
