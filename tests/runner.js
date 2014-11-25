'use strict';

var testrunner = require('qunit');

testrunner.run({
    code: {path: './src/cli/cli.js'},
    tests: './tests/unit/cli/test-cli.js'
});

testrunner.run({
    code: {path: './src/librejs-analyzer/util/util.js', namespace: 'util'},
    tests: './tests/unit/librejs-analyzer/util/test-util.js'
});

testrunner.run({
    code: {
        path: './src/librejs-analyzer/script/script.js',
        namespace: 'Script'
    },
    tests: './tests/unit/librejs-analyzer/script/test-script.js'
});
