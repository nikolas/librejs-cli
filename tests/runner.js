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
