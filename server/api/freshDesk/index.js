'use strict';
var request = require('request');
var express = require('express');

var router = express.Router();

router.post('/', function (req, res) {

    console.log(req.body);
    
    var options = {
        method: 'POST',
        url: 'https://objectbrains.freshdesk.com/helpdesk/tickets.json',
        headers: {
            'postman-token': '89b8a810-bcc3-9c06-e282-0ac89041c4e5',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            authorization: 'Basic bWV2aWhEVnFia3BFV0hXREc2bmE6WA=='
        },
        body: req.body,
        json: true
    };

    request(options, function (error, response, resBody) {
        if (error) throw new Error(error);

        res.json(resBody);
    });

});

module.exports = router;
