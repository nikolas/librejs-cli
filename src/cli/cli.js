/*
 * librejs-cli - A command-line tool for GNU LibreJS
 * Copyright (C) 2014 Nik Nyby
 *
 * This file is part of librejs-cli.
 *
 * librejs-cli is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * librejs-cli is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with librejs-cli.  If not, see  <http://www.gnu.org/licenses/>.
 */

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
     * @function run
     *
     * Run the analysis.
     *
     * @return {Boolean} - true if it passes, false otherwise.
     */
    run: function(environment) {
        var args = environment.args;
        console.log(args);
        var passed = false;

        var files = args;
        if (files.length <= 0) {
            return false;
        }

        files.forEach(function(file) {
            console.log('Analyzing: ' + file);
            if (fs.existsSync(file) && fs.statSync(file).isFile()) {
                var contents = fs.readFileSync(file, {encoding: 'utf-8'});
                var analyzer = new LibrejsAnalyzer({
                    data: contents
                });

                var report;
                if (file.match(/\.js$/)) {
                    report = analyzer.analyzeJs();
                } else if (file.match(/\.html$/)) {
                    report = analyzer.analyzeHtml();
                }
                if (!report.passed) {
                    passed = false;
                }
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
        });

        return passed;
    },

    /**
     * @function interpret
     *
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
