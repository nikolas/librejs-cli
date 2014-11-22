'use strict';

var Document = require('./document/document');
var Script = require('./script/script');

var Report = require('./report/report');

function LibrejsAnalyzer(options) {
    this.data = options.data;
    this.report = new Report();
}

module.exports = LibrejsAnalyzer;

LibrejsAnalyzer.prototype.analyzeJs = function() {
    console.info('creating Script');
    var script = new Script({
        data: this.data
    });
    this.report = script.analyze();
    return this.report;
};

LibrejsAnalyzer.prototype.analyzeHtml = function() {
    console.info('creating HtmlAnalyzer');
    var doc = new Document({
        data: this.data
    });
    this.report = doc.analyze();
    return this.report;
};
