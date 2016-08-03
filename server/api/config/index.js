'use strict';
var request = require('request');
var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
    res.json ({
        pingTime: 1000
    });
});

module.exports = router;