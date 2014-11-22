'use strict';

/**
    `LibrejsAnalyzer.Report` is LibrejsAnalyzer's output format.
*/
function Report(options) {
    // 'js' or 'html'
    this.type = 'js';

    // success if the script is free, false if nonfree scripts found
    this.isSuccess = true;

    this.items = [];
}

module.exports = Report;
