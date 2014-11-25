'use strict';

var acorn = require('acorn');

var util = require('../util/util');
var LicStartEndLicense = require('./lic-start-end-license');
var MagnetLicense = require('./magnet-license');
var ReportItem = require('../report/report-item');

/**
 * `LibrejsAnalyzer.Script` is responsible for analyzing JavaScript.
 */
function Script(options) {
    if (typeof options === 'undefined') {
        options = {};
    }
    this.data = options.data;
    this.report = [];
    this.isTrivial = false;
}

module.exports = Script;

/**
 * Run the script analysis.
 *
 * Returns an array of reports.
 *
 * @return {array}
 */
Script.prototype.analyze = function() {
    this.report.push('Analyzing JS..');

    var isTrivial = this._isTrivial();
    var hasLicStartLicense = !!this._findLicStartLicense();
    var hasMagnetLicense = !!this._findMagnetLicense();

    this.report.push(new ReportItem({
        desc: 'Is this script trivial?',
        type: 'triviality',
        val: isTrivial
    }));
    this.report.push(new ReportItem({
        desc: 'Is there a @licstart/@licend license?',
        type: 'lic-start-end',
        val: hasLicStartLicense
    }));
    this.report.push(new ReportItem({
        desc: 'Is there a magnet license?',
        type: 'magnet-license',
        val: hasMagnetLicense
    }));

    this.report.passed = isTrivial;
    if (isTrivial === false) {
        this.report.passed = hasLicStartLicense || hasMagnetLicense;
    }

    return this.report;
};

/**
 * Check if this script is considered trivial.
 *
 * @method _checkForTriviality
 * @return {boolean}
 */
Script.prototype._isTrivial = function() {
    var isTrivial = true;

    // Parse the script to see if it's trivial, i.e. does it contain any
    // functions? Does it use eval?
    var acornParse = acorn.parse(this.data);
    var node = acornParse.body[0];

    // Search the AST created by acorn for a function declaration
    var hasFunction = util.deepFindInObject(
        node, 'type', 'FunctionExpression');

    if (hasFunction) {
        isTrivial = false;
    }

    this.isTrivial = isTrivial;
    return this.isTrivial;
};

/**
 * Look for licstart/licend license. Warn if more than one is found.
 *
 * @method _findLicStartLicense
 * @return {object}
 */
Script.prototype._findLicStartLicense = function() {
    var licStartEndRe =
        /@licstartThefollowingistheentirelicensenoticefortheJavaScriptcodeinthis(?:page|file)(.*)?@licendTheaboveistheentirelicensenoticefortheJavaScriptcodeinthis(?:page|file)/mi;
    var matched = util.removeWhitespace(this.data).match(licStartEndRe);
    if (matched) {
        var licStartEndLicense = new LicStartEndLicense(this.data);
        return licStartEndLicense;
    } else {
        return null;
    }
};

/**
 * Look for magnet link. Warn if more than one is found.
 *
 * @method _findMagnetLicense
 * @return {object}
 */
Script.prototype._findMagnetLicense = function() {
    var licenseMagnet = /.*@license ?(magnet\:\?xt=urn\:btih\:[0-9A-Za-z]+).*/;
    var licenseEndMagnet = /.*@license-end.*/i;
    var matched = util.removeWhitespace(this.data).match(licenseMagnet);
    if (matched) {
        var magnetLicense = new MagnetLicense(this.data);
        return magnetLicense;
    } else {
        return null;
    }
};
