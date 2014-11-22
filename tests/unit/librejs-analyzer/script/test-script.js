var fs = require('fs');

QUnit.module('Script module', {
    setup: function() {
        var js = fs.readFileSync('./tests/mock/js/shelltypist.js', {
            encoding: 'utf-8'
        });
        this.script = new Script({data: js});
    }
});

test('Test the Script constructor', function() {
    ok(this.script);

    var newScript = new Script({
        data: 'console.log("Hello!");'
    });
    ok(newScript);

    var scriptConstructorWithNoData = new Script();
    ok(scriptConstructorWithNoData);
});

test('Test _checkForTriviality', function() {
    var report = this.script.analyze();
    var item;
    for (var i = 0; i < report.length; i++) {
        if (report[i].type === 'triviality') {
            item = report[i];
            break;
        }
    }
    strictEqual(item.val, false);
});

test('Test _findLicStartLicense', function() {
    ok(true);
});

test('Test _findMagnetLink', function() {
    ok(true);
});
