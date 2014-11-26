'use strict';

var acorn = require('acorn');

var util = require('../util/util');

/**
 * `LibrejsAnalyzer.Script.AstAnalysis` is responsible for analyzing the
 * abstract syntax tree of the Script.
 */
function AstAnalysis(jsString) {
    this.js = jsString;
    this.acornParse = acorn.parse(jsString);
    this.node = this.acornParse.body[0];
}

module.exports = AstAnalysis;

/**
 * @return {boolean}
 */
AstAnalysis.prototype.hasFunction = function() {
    // Search the AST created by acorn for a function declaration
    var hasFunction = util.deepFindInObject(
        this.node, 'type', 'FunctionExpression');

    return !!hasFunction;
};

/**
 * @return {boolean}
 */
AstAnalysis.prototype.hasEval = function() {
    // FIXME this works for now but should also check if type == Identifier
    var hasEval = util.deepFindInObject(
        this.node, 'name', 'eval');

    return !!hasEval;
};
