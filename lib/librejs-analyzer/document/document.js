'use strict';

/**
    `LibrejsAnalyzer.Document` is the class responsible for analyzing an HTML
    document.
*/
function Document(options) {
    this.data = options.data;
    this.report = [];
    this.hasWebLabelsTable = false;
    this.hasWebLabelsLink = false;
}

module.exports = Document;

Document.prototype.analyze = function() {
    this.report.push('Yeah it was HTML');
    return this.report;
};

Document.prototype.findInlineJavascript = function() {
    return true;
};

Document.prototype.findWebLabelsLink = function() {
    return true;
};

Document.prototype.findWebLabelsTable = function() {
    return true;
};
