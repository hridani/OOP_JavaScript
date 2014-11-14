define([],function ()
{
    'use strict';
    Object.prototype.validateNonEmptyString = function(value, variableName) {
        if (typeof (value) != "string" || !value)
            throw new Error(variableName + " should be non-empty string");
    }

    Object.prototype.validateBoolean = function(value, variableName) {
        if (typeof (value) != "boolean")
            throw new Error(variableName + " should be a boolean");
    }
});