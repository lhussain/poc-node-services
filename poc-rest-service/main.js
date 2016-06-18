"use strict";

//3rd party libraries
var express = require("express");
var morgan = require("morgan");

//Our libraries
var middleware = require("./lib/middleware");
var buildConfig = require("./lib/utils/buildConfig");
var setupRoutes = require("./lib/startup/setupRoutes");

//Services
var loggerServiceClass = require("./lib/logging/logger");


require("dotenv").load();
if (process.env.NODE_ENV !== "development") require("newrelic");


function startNode (app, log) {
    app.listen(process.argv[2] || process.env.KWTR_PORT || 3000);
    log.info("KWTR Started");
    log.info("Listening on %s...", process.argv[2] || process.env.KWTR_PORT || 3000);
    console.info("KWTR Started >>>>>>>>>>>>>");
    console.info("Listening on %s...", process.argv[2] || process.env.KWTR_PORT || 3000);
}

//*** invoke main function ****
buildConfig.buildConfig(function (config) {
    var logger = loggerServiceClass();
    var log = logger.log();
    var app = express();

    app.use(morgan(logger.accessLogConfig()));

    setupRoutes.createRouters(app, logger, config);

    app.use(middleware.errorLogger(log));
    app.use(middleware.errorHandler);

    startNode(app, log);
});