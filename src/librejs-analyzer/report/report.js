/*
 * librejs-cli - A command-line tool for GNU LibreJS
 * Copyright (C) 2014-2015 Nik Nyby
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

var sprintf = require('sprintf-js');

/**
 * Report
 *
 * LibrejsAnalyzer's output format.
 */
function Report(options) {
    // 'js' or 'html'
    this.type = 'js';

    if (options && options.type === 'html') {
        this.type = 'html';
    }

    // false if nonfree scripts found
    this.passed = false;

    this.items = [];
}

module.exports = Report;

/**
 * addItem
 *
 * @param {ReportItem} item
 */
Report.prototype.addItem = function(item) {
    this.items.push(item);
};

/**
 * render
 *
 * @return {String}
 */
Report.prototype.render = function() {
    var str = '';

    this.items.forEach(function(item) {
        if (typeof item.desc !== 'undefined' &&
            typeof item.val !== 'undefined'
           ) {
            str += sprintf.sprintf('%(desc)-30s\t%(val).1s', item);
        } else if (typeof item === 'string') {
            str += sprintf.sprintf('%s', item);
        } else {
            str += item;
        }
        str += '\n';
    });

    str += sprintf.sprintf('%\'-33s\n', '');
    str += this.passed ?
        'Passed' :
        'Failed (no license found, and nontrivial)';

    return str;
};
