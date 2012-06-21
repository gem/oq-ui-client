/*
 Copyright (c) 2010-2012, GEM Foundation.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/agpl.html>. */

Ext.namespace('gem.utils');

function fromFieldToDescription(field){
    /* e.g. upper_seismogenic_min =>   Upper Seismogenic Min */
    var ret = field.replace(/(\_[a-z])/g, 
			    function($1){
				return $1.toUpperCase().replace('_',' ');
			    });
    ret = ret.replace(/^[a-z]/g, function($1) { return $1.toUpperCase() });
    return ret;
};

function fieldSuffix(field) {
    return field.split('_').reverse()[0];
}

function fieldPrefix(field) {
    return field.split('_').slice(0, -1).join('_');
}

/* Validation utility */
/* makes some assumption about the field naming convention */
checkInterval = function(grid, field, value) {
    var max_val, min_val, pref_val, op;
    var suffix = fieldSuffix(field);
    var prefix = fieldPrefix(field);
    var description = fromFieldToDescription(prefix);
    if (!value) 
	return;
    switch(suffix) {
    case 'max':
	min_val = grid.getCurrentValue(prefix + '_min', parseFloat);
	pref_val = grid.getCurrentValue(prefix + '_pref', parseFloat);
	pref_val = pref_val || grid.getCurrentValue(prefix + '_pre', parseFloat);
	max_val = value;
	op = "less"
	break;
    case 'min':
	max_val = grid.getCurrentValue(prefix + '_max', parseFloat);
	pref_val = grid.getCurrentValue(prefix + '_pref', parseFloat);
	pref_val = pref_val || grid.getCurrentValue(prefix + '_pre', parseFloat);
	min_val = value;
	op = "greater"
	break;
    case 'pre':
    case 'pref':
	min_val = grid.getCurrentValue(prefix + '_min', parseFloat);
	max_val = grid.getCurrentValue(prefix + '_max', parseFloat);
	pref_val = value;
	break;
    }
    if (min_val && max_val && min_val >= max_val) {
	return description + " interval wrong. Max " + description + " has to be greater than the minimum " + description;
    }
    if (min_val && max_val && pref_val && (pref_val < min_val || pref_val > max_val)) {
	return "Preferred " + description + " has to be between the minimum and the maximum " + description;
    }
}

function checkBetween(field, value, min, max) {
    value = parseFloat(value);
    var description = fromFieldToDescription(field);
    if (!value)
	return;
    if (value <= min || value >= max) {
	return description + " has to be between " + min + " and " + max;
    }
}

function checkCompleteness(field, value) {
    value = parseFloat(value);
    checkBetween(field, value, 1, 4) || gem.utils.checkInteger(field, value);
}

function checkAngle(field, value) {
    value = parseFloat(value);
    checkBetween(field, value, 0, 360);
}

function checkQuadrant(field, value) {
    value = parseFloat(value);
    checkBetween(field, value, 0, 90);
}

function checkPositive(field, value) {
    var description = fromFieldToDescription(field);
    value = parseFloat(value);
    if (!value)
	return;
    if (value < 0) {
	return description + " has to be strictly positive";
    }
}

gem.utils.checkInteger = function(fieldName, value) {
    var description = fromFieldToDescription(field);
    var intValue = parseInt(value);
    var floatValue = parseFloat(value);
    if (intValue != floatValue) {
	return description + " is not an integer";
    }
}

function pushError(errors, error) {
    if (error) {
	errors.push(error);
    }
}