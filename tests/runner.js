'use strict';

var testrunner = require('qunit');

testrunner.run({
    code: {path: './lib/cli/cli.js', namespace: 'CLI'},
    tests: './tests/unit/cli/test-cli.js'
});

testrunner.run({
    code: {path: './lib/librejs-analyzer/util/util.js', namespace: 'util'},
    tests: './tests/unit/librejs-analyzer/util/test-util.js'
});

testrunner.run({
    code: {
        path: './lib/librejs-analyzer/script/script.js',
        namespace: 'Script'
    },
    tests: './tests/unit/librejs-analyzer/script/test-script.js'
});
