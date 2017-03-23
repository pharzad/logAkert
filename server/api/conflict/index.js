var express = require('express');
var controller = require('./conflict.controller');

var router = express.Router();

router.get('/', controller.getConflicts);

module.exports = router;
