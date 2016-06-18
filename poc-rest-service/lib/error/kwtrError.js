"use strict";

//3rd party libraries
var _ = require("underscore");
var util = require("util");

//Our libraries
var errorCodes = require("./schema/errorCodes");
var errorLookup = require("./errorLookup");

/**
 * Create an Error with an 'errors' array. For each error will be mapped to our list of error codes if an errorCode
 * is provided
 *
 * @param errors an array of object or an object with 3 optional fields: errorCode, message, errorObj
 * @cause wrapped error, cause of this error - optional
 * @constructor
 */
function KwtrError (errors, cause) {
    Error.call(this);
    Error.captureStackTrace(this, KwtrError);

    this.name = "KwtrError";
    this.message = "See errors property for more details";
    if (cause) {
        this.message += ", cause: " + cause.message;
        this.cause = cause;
    }

    errors = errors || [];
    if (!_.isArray(errors)) {
        errors = [ errors ];
    }
    this.errors = errors.map(function (error) {
        return _.extend({
            errorObj: error.errorObj || "n/a",
            errorDesc: error.message
        }, errorCodes[error.errorCode || errorLookup.generalApplicationError]);
    });
}

util.inherits(KwtrError, Error);

module.exports = KwtrError;