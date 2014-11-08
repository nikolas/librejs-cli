'use strict';

var CLI = require('./cli');

module.exports = cli;

function cli(options) {
    var environment = {
        cliArgs: options.cliArgs
    };

    return new CLI({}).run(environment);
}
