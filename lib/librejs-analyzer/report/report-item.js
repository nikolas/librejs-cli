'use strict';

/**
    `LibrejsAnalyzer.ReportItem` is analysis data.
*/
function ReportItem(options) {
    if (typeof options === 'string') {
        options = {desc: options};
    }

    this.desc = options.desc;
    this.type = options.type;
    this.val = options.val;
}

module.exports = ReportItem;
