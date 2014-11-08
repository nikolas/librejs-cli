'use strict';

var fs = require('fs');
var RSVP = require('rsvp');
var LibrejsAnalyzer = require('../librejs-analyzer/librejs-analyzer');

function CLI(options) {
}

module.exports = CLI;

CLI.prototype.run = function(environment) {
    var args = environment.cliArgs;

    if (args.length > 0) {
        var arg = args[0];
        if (fs.existsSync(arg) && fs.statSync(arg).isFile()) {
            var contents = fs.readFileSync(arg, {encoding: 'utf-8'});
            var analyzer = new LibrejsAnalyzer({
                data: contents
            });

            var report;
            if (arg.match(/\.js$/)) {
                report = analyzer.analyzeJs();
            } else if (arg.match(/\.html$/)) {
                report = analyzer.analyzeHtml();
            }
            console.log('report:', report);
        }
    }

    return RSVP.resolve();
};
