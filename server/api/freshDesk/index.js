'use strict';

var express = require('express');

var router = express.Router();

router.post('/', function (req, res) {

    console.log(req.data);

});

module.exports = router;
