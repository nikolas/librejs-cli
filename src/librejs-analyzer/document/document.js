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

var Report = require('../report/report');
var ReportItem = require('../report/report-item');

/**
 * `LibrejsAnalyzer.Document` is responsible for analyzing an HTML document.
 */
function Document(options) {
    if (typeof options === 'undefined') {
        options = {};
    }
    this.data = options.data;
    this.report = new Report();
    this.hasWebLabelsTable = false;
    this.hasWebLabelsLink = false;
}

module.exports = Document;

Document.prototype.analyze = function() {
    var hasInlineJavascript = this._hasInlineJavascript();
    var hasWebLabelsLink = this._hasWebLabelsLink();
    var hasWebLabelsTable = this._hasWebLabelsTable();
    this.report.addItem(new ReportItem({
        desc: 'Has inline JavaScript?',
        type: 'has-inline-js',
        val: hasInlineJavascript
    }));
    this.report.addItem(new ReportItem({
        desc: 'Has Web Labels link?',
        type: 'has-weblabels-link',
        val: hasWebLabelsLink
    }));
    this.report.addItem(new ReportItem({
        desc: 'Has Web Labels table?',
        type: 'has-weblabels-table',
        val: hasWebLabelsTable
    }));
    this.report.passed = true;
    return this.report;
};

Document.prototype._hasInlineJavascript = function() {
    return null;
};

Document.prototype._hasWebLabelsLink = function() {
    return !!this.data.match(/ rel=("|')jslicense("|')/);
};

Document.prototype._hasWebLabelsTable = function() {
    return !!this.data.match(/ id=("|')jslicense-labels1("|')/);
};
