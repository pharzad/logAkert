'use strict';

var express = require('express');
var controller = require('./drop-down.controller');

var router = express.Router();

router.get('/start', function(req, res) {
  controller.createDrop(function(result) {
    res.send(result);
  });
});

router.get('/', function(req, res) {
  controller.getDropDown(function(result) {
    res.json(result);
  });
});

module.exports = router;
