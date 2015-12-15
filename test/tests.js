'use strict'

var async = require('async');
var usersTests = require('./acceptance/users');
var postsTests = require('./acceptance/posts');

async.series([
  usersTests,
  postsTests
]);