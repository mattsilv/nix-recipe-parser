/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var request = require('request');

function jsonSafeParse(o) {
    try {
        return JSON.parse(o);
    } catch (e) {
        console.error(e);
    }
}

function isJSON(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function (app) {
    var apiConfig = app.get('config').api;

    var estimatedNutritionHttpOptions = {
        method:  'POST',
        timeout: 10000,
        headers: {
            'Content-Type': 'text/plain',
            'X-APP-ID':     apiConfig.APP_ID,
            'X-APP-KEY':    apiConfig.APP_KEY
        }
    };

    return {
        index: function (req, res, next) {

            var requestOptions = _.assign(
                estimatedNutritionHttpOptions,
                {
                    url: apiConfig.host + req.params.endpoint,
                    body: req.rawBody
                }
            );

            request(
                requestOptions,
                function (apiErr, apiRes, apiBody) {
                    // check for general error
                    if (apiErr || apiRes && apiRes.statusCode !== 200) {
                        return next({
                            status: 500,
                            messsage: 'api error',
                            error:    apiErr || apiBody
                        });
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(apiBody);
                    }
                }
            );
        }
    }
};
