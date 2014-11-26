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

var testrunner = require('qunit');

testrunner.setup({
    log: {
        errors: true,
        globalSummary: true
    }
});

testrunner.run([
    {
        code: {path: './src/cli/cli.js'},
        tests: './tests/unit/cli/test-cli.js'
    },
    {
        code: {
            path: './src/librejs-analyzer/util/util.js',
            namespace: 'util'
        },
        tests: './tests/unit/librejs-analyzer/util/test-util.js'
    },
    {
        code: {
            path: './src/librejs-analyzer/script/script.js',
            namespace: 'Script'
        },
        tests: './tests/unit/librejs-analyzer/script/test-script.js'
    },
    {
        code: {
            path: './src/librejs-analyzer/script/ast-analyzer.js',
            namespace: 'AstAnalyzer'
        },
        tests: './tests/unit/librejs-analyzer/script/test-ast-analyzer.js'
    }
]);
