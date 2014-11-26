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

test('Test the AstAnalyzer constructor', function() {
    ok(new AstAnalyzer('1 + 2;'));
    ok(new AstAnalyzer(''));
});

test('hasFunction', function() {
    var aa = new AstAnalyzer('function hello() { console.log(\'hi\'); }');
    ok(aa.hasFunction());

    aa = new AstAnalyzer('4 + 4;');
    ok(!aa.hasFunction());
});

test('hasEval', function() {
    var aa = new AstAnalyzer('eval(2 + 4);');
    ok(aa.hasEval());

    aa = new AstAnalyzer('function hello() { console.log(\'hi\'); }');
    ok(!aa.hasEval());
});
