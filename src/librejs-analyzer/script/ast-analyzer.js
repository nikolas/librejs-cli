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
 *
 * @constructor
 */
function AstAnalyzer(jsString) {
    this.js = jsString;
    this.acornParse = acorn.parse(jsString);
    this.node = this.acornParse.body[0];
}

module.exports = AstAnalyzer;

/**
 * @function createsXhr
 * @return {Boolean}
 */
AstAnalyzer.prototype.createsXhr = function() {
    /*
     * The analysis code in many of the AstAnalyzer functions searche the
     * syntax tree each time with deepFindInObject. When integrating with
     * LibreJS it will be important to change this around and only do the
     * search once.
     */
    var xhr = util.deepFindInObject(
        this.node, 'name', 'XMLHttpRequest');
    if (xhr && xhr.type === 'Identifier') {
        return true;
    }
    xhr = null;

    // Does anything still use ActiveXObject?
    xhr = util.deepFindInObject(
        this.node, 'name', 'ActiveXObject');
    if (xhr && xhr.type === 'Identifier') {
        return true;
    }

    return false;
};

/**
 * @function hasFunction
 * @return {Boolean}
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
 * @function hasEval
 * @return {Boolean}
 */
AstAnalyzer.prototype.hasEval = function() {
    // FIXME this works for now but should also check if type == Identifier
    var hasEval = util.deepFindInObject(
        this.node, 'name', 'eval');

    return !!hasEval;
};
