'use strict';

/**
    `LibrejsAnalyzer.Util.Util` contains some utility functions.
*/
function Util(text) {
    this.text = text;
}

/**
    Find out if a deeply-nested object contains the given key and value.

    @return {object}
*/
Util.prototype.deepFindInObject = function(object, key, value) {
    if (object.hasOwnProperty(key) && object[key] === value) {
        return object;
    }

    for (var i=0; i < Object.keys(object).length; i++) {
        if (typeof object[Object.keys(object)[i]] === 'object') {
            var o = this.deepFindInObject(
                object[Object.keys(object)[i]], key, value);
            if (o !== null) {
                return o;
            }
        }
    }

    return null;
};

/**
    @method removeWhitespace
*/
Util.prototype.removeWhitespace = function(str) {
    return str.replace(/\s+/gmi, '');
}

var util = new Util();

module.exports = util;
