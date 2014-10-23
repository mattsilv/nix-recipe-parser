'use strict';

module.exports = function(app){
    var express = require('express');
    var controller = require('./proxy.controller')(app);

    var router = express.Router();

    router.post(':endpoint(*)', controller.index);

    return router;
};