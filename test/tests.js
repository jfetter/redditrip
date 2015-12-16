'use strict'

var usersTests = require('./acceptance/users');
var postsTests = require('./acceptance/posts');

usersTests(
	postsTests(
		console.log('DONE')
	)
)