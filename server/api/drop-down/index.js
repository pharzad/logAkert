'use strict';

var express = require('express');
var controller = require('./drop-down.controller');

var router = express.Router();

router.get('/', (req, res) => {
  controller.createDrop((res) => {
    res.json(res);
  })
});

module.exports = router;
