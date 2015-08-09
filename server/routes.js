/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function (app) {

    // Insert routes below
    //  app.use('/api/things', require('./api/thing'));
    app.use('/api/logs', require('./api/log'));

    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);
    
    app.route('/*')
        .get(function (req, res) {
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });
};