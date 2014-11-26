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

/**
 * `LibrejsAnalyzer.Document` is responsible for analyzing an HTML document.
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
