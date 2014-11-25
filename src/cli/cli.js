'use strict';

var cli = require('cli');
var fs = require('fs');
var path = require('path');

var LibrejsAnalyzer = require('../librejs-analyzer/librejs-analyzer');

var OPTIONS = {
    'verbose': ['V', 'Show additional info during analysis'],
    'quiet': ['q', 'Run the analysis yielding nothing but a return code']
};

var exports = {
    /**
     * Run the analysis.
     *
     * Returns true if it passes, false otherwise.
     */
    run: function(environment) {
        var args = environment.args;
        var passed = false;

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
                passed = report.passed;
                report.forEach(function(item) {
                    if (typeof item.desc !== 'undefined' &&
                        typeof item.val !== 'undefined'
                       ) {
                        console.log(item.desc, '\t', item.val);
                    } else {
                        console.log(item);
                    }
                });
            }
        }

        return passed;
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
                var passed = exports.run({
                    args: process.argv.slice(2),
                    inputStream: process.stdin,
                    outputStream: process.stdout
                });
                process.exit(passed ? 0 : 2);
            } else {
                cli.error('No input file');
            }
        });
    }
};

module.exports = exports;
