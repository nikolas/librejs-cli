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

var acorn = require('acorn');

var util = require('../util/util');

/**
 * `LibrejsAnalyzer.Script.AstAnalysis` is responsible for analyzing the
 * abstract syntax tree of the Script.
 */
function AstAnalyzer(jsString) {
    this.js = jsString;
    this.acornParse = acorn.parse(jsString);
    this.node = this.acornParse.body[0];
}

module.exports = AstAnalyzer;

/**
 * @return {boolean}
 */
AstAnalyzer.prototype.hasFunction = function() {
    // Search the AST created by acorn for a function expression or declaration
    var hasFunction = util.deepFindInObject(
        this.node, 'type', 'FunctionExpression');

    if (hasFunction) {
        return !!hasFunction;
    }

    hasFunction = util.deepFindInObject(
        this.node, 'type', 'FunctionDeclaration');

    return !!hasFunction;
};

/**
 * @return {boolean}
 */
AstAnalyzer.prototype.hasEval = function() {
    // FIXME this works for now but should also check if type == Identifier
    var hasEval = util.deepFindInObject(
        this.node, 'name', 'eval');

    return !!hasEval;
};
