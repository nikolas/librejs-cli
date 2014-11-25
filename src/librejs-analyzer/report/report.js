'use strict';

/**
    `LibrejsAnalyzer.Report` is LibrejsAnalyzer's output format.
*/
function Report(options) {
    // 'js' or 'html'
    this.type = 'js';

    // false if nonfree scripts found
    this.passed = false;

    this.items = [];
}

module.exports = Report;
