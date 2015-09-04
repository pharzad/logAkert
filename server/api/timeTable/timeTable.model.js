'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TimeTableSchema = new Schema({
    userName: String,
    week: Date,
    weekDays: [{
        day: String,
        hours: [{
            occupied: Boolean,
            val: Number
        }]
    }]
});

module.exports = mongoose.model('timeTable', TimeTableSchema);