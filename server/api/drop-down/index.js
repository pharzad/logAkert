'use strict';

var express = require('express');
var controller = require('./drop-down.controller');

var router = express.Router();

router.get('/', function(req, res){
  controller.createDrop(function (res) {
    res.json(res);
  });
});

module.exports = router;
