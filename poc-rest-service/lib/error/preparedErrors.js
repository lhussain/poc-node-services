"use strict";

//Our libraries
var ErrorLookup = require("./errorLookup");
var KwtrError = require("./kwtrError");

function kwtrDbNoDataFound (inputs) {
    var msg = "The requested data cannot be found";

    if (inputs) {
        msg += " for: ";

        for (var i = 0; i < inputs.length; i++) {
            if ( i === 0) {
                msg += inputs[i].param + ": " + inputs[i].value;
            } else {
                msg += ", ";
                msg += inputs[i].param + ": " + inputs[i].value;
            }
        }
    }
    return new KwtrError({
        errorCode: ErrorLookup.dataNotFound,
        errorObj: "database",
        message: msg
    });
}
function kwtrDbGeneralError (errorMessage) {
    return new KwtrError({
        errorCode: ErrorLookup.generalApplicationError,
        errorObj: "database",
        message: errorMessage
    });
}

function kwtrMongoGeneralError (errorMessage) {
    return new KwtrError({
        errorCode: ErrorLookup.generalApplicationError,
        errorObj: "mongo",
        message: errorMessage
    });
}

function kwtrOtherError (code, errorObj) {
    return new KwtrError({
        errorCode: code,
        errorObj: errorObj
    });
}

function generalErrorWithDetails (errorObj, err, message) {
    message = message || "";
    return new KwtrError({
        errorCode: ErrorLookup.generalApplicationError,
        errorObj: errorObj,
        message: message
    }, err);
}

function generalError (errorObj, message) {
    return new KwtrError({
        errorCode: ErrorLookup.generalApplicationError,
        errorObj: errorObj,
        message: message
    });
}

function idExistsErrorWithDetails (errorObj, message, err) {
    return new KwtrError({
        errorCode: ErrorLookup.idAlreadyExists,
        errorObj: errorObj,
        message: message
    }, err);
}

function idExistsErrorNoDetails (errorObj) {
    return new KwtrError({
        errorCode: ErrorLookup.idAlreadyExists,
        errorObj: errorObj
    });
}

function invalidFieldValueError (errorObj, message) {
    message = message || "";
    return new KwtrError({
        errorCode: ErrorLookup.invalidFieldValue,
        errorObj: errorObj,
        message: message
    });
}

function invalidObjectError (errorObj, err) {
    return new KwtrError({
        errorCode: ErrorLookup.invalidObjectType,
        errorObj: errorObj
    }, err);
}

function requestedResourceNotFoundError (errorObj, err) {
    err = err || null;
    return new KwtrError({
        errorObj: errorObj,
        errorCode: ErrorLookup.requestedResourceCannotBeFound
    }, err);
}

function valueProvidedNotValidTypeError (errorObj) {
    return new KwtrError({
        errorCode: ErrorLookup.valueProvidedNotValidType,
        errorObj: errorObj
    });
}

function missingMandatoryField (errorObj, message) {
    return new KwtrError({
        errorCode: ErrorLookup.missingMandatoryField,
        errorObj: errorObj,
        message: message
    });
}

module.exports = {
    kwtrDbNoDataFound: kwtrDbNoDataFound,
    kwtrDbGeneralError: kwtrDbGeneralError,
    kwtrMongoGeneralError: kwtrMongoGeneralError,
    kwtrOtherError: kwtrOtherError,
    generalErrorWithDetails: generalErrorWithDetails,
    generalError: generalError,
    idExistsErrorWithDetails: idExistsErrorWithDetails,
    invalidFieldValueError: invalidFieldValueError,
    invalidObjectError: invalidObjectError,
    valueProvidedNotValidTypeError: valueProvidedNotValidTypeError,
    idExistsErrorNoDetails: idExistsErrorNoDetails,
    requestedResourceNotFoundError: requestedResourceNotFoundError,
    missingMandatoryField : missingMandatoryField
};