'use strict';
var request = require('request');
var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
    res.json({
        ping: {
            status: true,
            interval: 1000
        },
        forceOffile:{
            refresh:false,
            force:false
        },
        pingTime: 1000
    });
});

module.exports = router;