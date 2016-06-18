"use strict";

exports.errorLogger = function errorLogger (logger) {
    return function (error, req, res, next) {
        if (error.cause) {
            logger.error(error.cause);
        }

        logger.error({ err: error, req: req }, error);
        next(error);
    };
};

exports.errorHandler = function errorHandler (error, req, res, next) {  // jshint ignore:line
    res.send(error.status || 500, {
        error: error.errors || error.message || "Internal Server Error"
    });
};