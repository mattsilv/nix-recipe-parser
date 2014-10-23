'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
    DOMAIN:         'http://localhost:9000',
    SESSION_SECRET: 'externalapi-secret',

    // Control debug level for modules using visionmedia/debug
    DEBUG:          '',
    // Nutritionix api settings
    API_APP_ID:  'PROVIDE IT IN local.env.js',
    API_APP_KEY: 'PROVIDE IT IN local.env.js'
};
