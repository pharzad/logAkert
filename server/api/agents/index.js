'use strict';
var request = require('request');
var express = require('express');
var controller = require('./agent.controller');

var router = express.Router();

router.post('/', controller.addAgent);

module.exports = router;
