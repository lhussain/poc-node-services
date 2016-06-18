"use strict";

//3rd party libraries
var express = require("express");

//Services
var pocServiceClass = require("../services/poc/pocService");

//Routers
var pocRouterClass = require("../services/poc/pocRouter");

function createPocRouter (logger, config) {
    var pocService = pocServiceClass(config);
    var pocRouter = pocRouterClass.router(pocService);

    logger.registerLoggingEvents(pocService, "POC Service");
    logger.registerLoggingEvents(pocRouter, "POC Router");

    return pocRouter;
}

function createRouters (app, logger, config) {
    var pocRouter = createPocRouter(logger, config);

    var mainRouter = express.Router();

    mainRouter.use(pocRouter);

    app.use("/kwtr", mainRouter);
}

module.exports = {
    createRouters: createRouters
};