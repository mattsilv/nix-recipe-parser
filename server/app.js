/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
app.set('config', config);

var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Log the error
app.use(function(err, req, res, next){
    if(err){
        res.json(500, err);
    }
});

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;