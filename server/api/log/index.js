'use strict';

var express = require('express');
var controller = require('./logs.controller');

var router = express.Router();

router.get('/', controller.index);
//router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/getLatestActivity', controller.latestActivity);
router.get('/getLatestStatus', controller.latest);
router.post('/search', controller.search);
router.get('/count', controller.count);

module.exports = router;