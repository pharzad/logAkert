'use strict';

var timeTable = require('./timeTable.model');

// Get list of things
exports.index = function (req, res) {
    timeTable.find(function (err, things) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(things);
    });
};

// Get list of userTable
exports.getUserTimeTable = function (req, res) {
    timeTable.find({userName:req.params.user},function (err, things) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(things);
    });
};

// Creates a new thing in the DB.
exports.create = function (req, res) {

        console.log(req.body);
    timeTable.create(req.body, function (err, log) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(log);
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}