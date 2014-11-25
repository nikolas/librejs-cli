'use strict';

var cli = require('cli');
var fs = require('fs');
var path = require('path');

var LibrejsAnalyzer = require('../librejs-analyzer/librejs-analyzer');

var OPTIONS = {
    'verbose': ['V', 'Show additional info during analysis']
};

var exports = {
    run: function(environment) {
        var args = environment.args;

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
    },

    /**
     * Program entrance
     */
    interpret: function() {
        cli.setUsage('librejs file.js');

        cli.enable('version', 'help');
        cli.setApp(path.resolve(__dirname + '/../../package.json'));

        cli.parse(OPTIONS);

        cli.main(function(args, options) {
            if (args.length) {
                exports.run({
                    args: process.argv.slice(2),
                    inputStream: process.stdin,
                    outputStream: process.stdout
                });
                process.exit();
            } else {
                cli.error('No input file');
            }
        });
    }
};

module.exports = exports;
