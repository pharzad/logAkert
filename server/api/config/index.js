'use strict';
var request = require('request');
var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
    res.json({
        ping: {
            status: false,
            interval: 10000
        },
        forceOffile: {
            refresh: true,
            force: true
        },
        pingTime: 1000,
        planBInterval: 60000,
        CallButt: true
    });
});

module.exports = router;