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
 * `LibrejsAnalyzer.Util.Util` contains some utility functions.
 *
 * @constructor
 */
function Util(text) {
    this.text = text;
}

/**
 * deepFindInObject
 *
 * Find out if a deeply-nested object contains the given key and value.
 *
 * @return {Object|null}
 */
Util.prototype.deepFindInObject = function(object, key, value) {
    if (object === null) {
        return null;
    }

    if (object.hasOwnProperty(key) && object[key] === value) {
        return object;
    }

    for (var i = 0; i < Object.keys(object).length; i++) {
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
 * removeWhitespace
 *
 * @param {String} str
 */
Util.prototype.removeWhitespace = function(str) {
    return str.replace(/\s+/gmi, '');
};

var util = new Util();

module.exports = util;
