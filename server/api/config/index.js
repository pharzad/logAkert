'use strict';
var request = require('request');
var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
    res.json({
        ping: {
            status: false,
            interval: 1000
        },
        forceOffile:{
            refresh:true,
            force:true
        },
        pingTime: 1000,
        planBInterval:30000
    });
});

module.exports = router;