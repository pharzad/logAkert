'use strict';
var request = require('request');
var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
  res.json({
    ping: {
      status: false,
      interval: 10000
    },
    forceOffile: {
      refresh: true,
      force: true
    },
    CallButt: true,
    stampBut: false,
    textToSpeech: false,
    stt: {
      textToSpeech: false,
      volume: .0
    },
    freeSwith:{
      timeout:3600
    }
  });
});

module.exports = router;
