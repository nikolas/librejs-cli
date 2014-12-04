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

test('Test _isTrivial false with function', function() {
    var report = this.script.analyze();
    var item;
    for (var i = 0; i < report.items.length; i++) {
        if (report.items[i].type === 'triviality') {
            item = report.items[i];
            break;
        }
    }
    strictEqual(item.val, false);
});

test('Test _isTrivial false with eval', function() {
    var js = fs.readFileSync('./tests/mock/js/eval.js', {
        encoding: 'utf-8'
    });
    this.script = new Script({data: js});

    var report = this.script.analyze();
    var item;
    for (var i = 0; i < report.items.length; i++) {
        if (report.items[i].type === 'triviality') {
            item = report.items[i];
            break;
        }
    }
    strictEqual(item.val, false);
});

test('Test _isTrivial true', function() {
    var js = 'console.log(1 + 2);';
    var script = new Script({data: js});
    var report = script.analyze();
    var item;
    for (var i = 0; i < report.items.length; i++) {
        if (report.items[i].type === 'triviality') {
            item = report.items[i];
            break;
        }
    }
    strictEqual(item.val, true);
});

test('Test _findLicStartLicense', function() {
    ok(true);
});

test('Test _findMagnetLink', function() {
    ok(true);
});
