"use strict";

//3rd party libraries
var _ = require("underscore");
var util = require("util");

//Our libraries
var errorCodes = require("./schema/errorCodes");

function getErrObj (err) {
    if (err.code === 302) //tv4.dataPath will be an empty string so we need to extract field name from tv4.message
        return err.message.substring(err.message.lastIndexOf(" ") + 1);

    return err.dataPath.length > 0 ? err.dataPath.substring(1) : "";
}

function JsonSchemaError (tv4, secondaryMapping) {

    secondaryMapping = secondaryMapping || false;

    Error.call(this);
    Error.captureStackTrace(this, JsonSchemaError);

    this.name = "JsonSchemaError";
    this.message = "Failed to validate JSON payload against its schema";

    tv4 = tv4 || [];

    //Transform tv4 errors into our error object
    this.errors = tv4.map(function (err) {
        var error = {
            errorDesc: err.message
        };

        error.errorObj = getErrObj(err);

        if (secondaryMapping) {
            return _.extend(error, JsonSchemaError.altTv4Codes[err.code]);
        }
        return _.extend(error, JsonSchemaError.tv4Codes[err.code]);
    });
}

util.inherits(JsonSchemaError, Error);

JsonSchemaError.tv4Codes = {
    0: errorCodes["1026"],
    200: errorCodes["1007"],
    202: errorCodes["1018"],
    1: errorCodes["1029"],
    103: errorCodes["1018"],
    302: errorCodes["1007"],
    400: errorCodes["1007"],
    11: errorCodes["1007"],
    303: errorCodes["1028"],
    201: errorCodes["1001"],
    101: errorCodes["1018"]
};

JsonSchemaError.altTv4Codes = {
    0: errorCodes["1026"],
    200: errorCodes["1007"],
    202: errorCodes["1018"],
    1: errorCodes["1029"],
    103: errorCodes["1018"],
    302: errorCodes["1031"],
    400: errorCodes["1031"],
    11: errorCodes["1031"],
    303: errorCodes["1028"],
    201: errorCodes["1001"],
    101: errorCodes["1018"]
};

module.exports = JsonSchemaError;