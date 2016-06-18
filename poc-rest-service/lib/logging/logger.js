"use strict";

//3rd party libraries
var bunyan = require("bunyan");
var fs = require("fs");

function _createLogger () {
    var logConfig = {
        name: "KWTR",
        serializers: bunyan.stdSerializers,
        level: process.env.KWTR_LOG_LEVEL || "info"
    };

    if (process.env.NODE_ENV !== "development") {
        logConfig.streams = [
            {
                path: process.env.KWTR_LOG_FILE || "/tmp/kwtr.log"
            }
        ];
    }

    return bunyan.createLogger(logConfig);
}

var logger = {};

logger.log = function () {
    return _createLogger();
};

logger.registerLoggingEvents = function registerLoggingEvents (service, moduleName) {

    var logger = _createLogger().child({ module: moduleName });

    service.on("kwtr:debug", function () {
        logger.debug.apply(logger, arguments);
    });

    service.on("kwtr:info", function () {
        logger.info.apply(logger, arguments);
    });

    service.on("kwtr:warn", function () {
        logger.warn.apply(logger, arguments);
    });

    return service;
};

logger.accessLogConfig = function accessLogConfig () {
    if (process.env.NODE_ENV === "development") {
        return "short";
    } else if (process.env.KWTR_ACCESS_LOG_FILE && process.env.KWTR_ACCESS_LOG_FILE !== "stdout") {
        return {
            stream: fs.createWriteStream(process.env.KWTR_ACCESS_LOG_FILE)
        };
    } else {
        return "default";
    }
};

module.exports = function () {
    return logger;
};