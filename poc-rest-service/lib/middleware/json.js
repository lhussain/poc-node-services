"use strict";

//3rd party libraries
var schemaValidation = require("tv4");

//Our libraries
var JsonSchemaError = require("../error/jsonSchemaError");
var PreparedErrors = require("../error/preparedErrors");

function jsonContentType (req, res, next) {
    if (req.is("json"))
        return next();

    var error = PreparedErrors.generalError("request", "The resource expects to receive a JSON payload");



    error.status = 415;
    next(error);
}

function jsonResponseHandler (res, next) {
    return function (err, response) {
        if (err)
            return next(err);

        res.json({
            error: null,
            data: response
        });
    };
}

function jsonResponseFormatter (fn) {
    return function (req, res, next) {
        res.format({
            json: function () {
                fn(req, res, jsonResponseHandler(res, next));
            }
        });
    };
}

function addReferenceSchemas (refSchemas) {
    refSchemas = refSchemas || [];
    refSchemas.forEach(function (schema) {
        schemaValidation.addSchema(schema.title, schema);
    });

    return refSchemas;
}

function validateSchema (req, jsonSchema, requiredMapping, next) {
    var result = schemaValidation.validateMultiple(req.body || "", jsonSchema);
    if (!result.valid) {
        var error = new JsonSchemaError(result.errors, requiredMapping);
        return next(error);
    }

    return next();
}

function jsonSchemaValidation (jsonSchema, refSchemas, requiredMapping) {
    requiredMapping = requiredMapping || false;

    return function middleware (req, res, next) {
        jsonContentType(req, res, function (err) {
            if (err)
                return next(err);

            refSchemas = addReferenceSchemas(refSchemas);
            return validateSchema(req, jsonSchema, requiredMapping, next);
        });
    };
}

function jsonSchemaValidationOptional (jsonSchema, refSchemas, requiredMapping) {
    requiredMapping = requiredMapping || false;

    return function middleware (req, res, next) {
        if (req.is("json")) {
            refSchemas = addReferenceSchemas(refSchemas);
            return validateSchema(req, jsonSchema, requiredMapping, next);
        } else {
            return next();
        }
    };
}

module.exports = {
    jsonContentType: jsonContentType,
    jsonSchemaValidation: jsonSchemaValidation,
    jsonResponseFormatter: jsonResponseFormatter,
    jsonResponseHandler: jsonResponseHandler,
    jsonSchemaValidationOptional: jsonSchemaValidationOptional
};