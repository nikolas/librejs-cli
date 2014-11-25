'use strict';

var cli = require('cli');
var fs = require('fs');

var LibrejsAnalyzer = require('../librejs-analyzer/librejs-analyzer');

var exports = {
    run: function(environment) {
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
    },

    /**
     * Program entrance
     */
    interpret: function(args) {
        cli.setUsage('librejs file.js');
        cli.parse();
        //var args = environment.cliArgs;

        cli.main(function(args, options) {
            if (args.length) {
                exports.run({
                    cliArgs: process.argv.slice(2),
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
