"use strict";

/**
 * Apologies for duplicating these values from errorCodes.json
 *
 */
var errors = {
    generalApplicationError: 1000,
    maximumLengthExceeded: 1001,
    requestedResourceCannotBeFound: 1004,
    missingMandatoryField: 1007,
    invalidFieldValue: 1018,
    invalidObjectType: 1026,
    idAlreadyExists: 1027,
    fieldNotAllowedForResourceType: 1028,
    valueProvidedNotValidType: 1029,
    systemFailedToPassAnAppRule: 1030,
    missingRequiredField: 1031,
    dataNotFound: 1032,
    valueNotAllowed: 1033
};

module.exports = errors;