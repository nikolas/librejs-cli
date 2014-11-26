'use strict';

var util = require('../util/util');
var AstAnalysis = require('./ast-analysis');
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
 * @method _isTrivial
 *
 * Check if this script is considered trivial. The following is from the
 * LibreJS 6.0.6 manual.
 *
 *    LibreJS considers JavaScript on a page nontrivial if any of the
 *    following are true:
 *
 *  * It makes an AJAX request or is loaded along with scripts that make
 *    an AJAX request,
 *
 *  * It loads external scripts dynamically or is loaded along with
 *    scripts that do,
 *
 *  * It defines functions or methods and either loads an external script
 *    (from HTML) or is loaded as one,
 *
 *  * It uses dynamic JavaScript constructs that are difficult to analyze
 *    without interpreting the program or is loaded along with scripts
 *    that use such constructs.  These constructs are:
 *       * Using the eval function
 *       * Calling methods with the square bracket notation
 *       * Using any other construct than a string literal with certain
 *         methods ('Obj.write', 'Obj.createElement', ...).
 *
 *
 * @return {boolean}
 */
Script.prototype._isTrivial = function() {
    var isTrivial = true;

    // Parse the script to see if it's trivial, i.e. does it contain any
    // functions? Does it use eval?
    var astAnalysis = new AstAnalysis(this.data);

    // Search the AST created by acorn for a function declaration
    if (astAnalysis.hasFunction()) {
        this.isTrivial = false;
        return this.isTrivial;
    }

    // FIXME this works for now but should also check if type == Identifier
    if (astAnalysis.hasEval()) {
        this.isTrivial = false;
        return this.isTrivial;
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
