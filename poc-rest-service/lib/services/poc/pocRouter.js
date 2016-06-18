"use strict";

//3rd party libraries
var _ = require("underscore");
var express = require("express");
var bodyParser = require("body-parser");
var events = require("events");

//Our libraries
var jsonMiddleware = require("../../middleware/json");
//var paramMiddleware = require("../../middleware/param");
var PreparedErrors = require("../../error/preparedErrors");

//exports.router = function ($depotService, $auth) {
exports.router = function ($pocService) {

    var router = _.extend(express.Router(), new events.EventEmitter());
    var BASE_PATH = "/poc/";
    router.use(bodyParser.json());
    //router.param("depotCode", paramMiddleware.depotCodeValidator);

    router.route(BASE_PATH + "lomans-code/:lomansCode")
        .get(jsonMiddleware.jsonResponseFormatter(function (req, res, cb) {
            $pocService.getMockData(req.params.lomansCode, cb);
        }));

//    router.route(BASE_PATH + "template/:matrixTemplateId")
//        .get($auth, jsonMiddleware.jsonResponseFormatter(function (req, res, cb) {
//            $depotService.getMatrixTemplateById(req.params.depotCode, req.params.matrixTemplateId, cb);
//        }))
//        .post([$auth,
//            jsonMiddleware.jsonSchemaValidation(UpdateMatrixTemplateSchema, [MatrixLineSchema, MatrixLineNotOuterSector, MatrixPostcodeSchema, MatrixSectorPlusOneSchema, MatrixSectorPostcodeSchema, MatrixOuterPostcodeSchema, MatrixLineOuterSchema], false),
//            jsonMiddleware.jsonSchemaValidation(UpdateMatrixTemplateSchemaReq, [MatrixLineSchemaReq, MatrixLineNotOuterSectorReq, MatrixPostcodeSchemaReq, MatrixSectorPlusOneSchemaReq, MatrixSectorPostcodeSchemaReq, MatrixOuterPostcodeSchemaReq], true)
//        ], jsonMiddleware.jsonResponseFormatter(function (req, res, cb) {
//            $depotService.updateMatrixTemplate(req.params.depotCode, req.params.matrixTemplateId, req.body.matrixTemplate, cb);
//        }))
//        .delete($auth, jsonMiddleware.jsonResponseFormatter(function (req, res, cb) {
//            $depotService.deleteMatrixTemplateById(req.params.depotCode, req.params.matrixTemplateId, cb);
//        }));


//    router.route("/corebusiness/matrix/")
//        .post([$auth], jsonMiddleware.jsonResponseFormatter(function (req, res, cb) {
//            var action = req.param("action");
//            if (action === "Generate") {
//                $depotService.createDailyDynamicRoutes(cb);
//            } else {
//                cb(PreparedErrors.invalidFieldValueError("action", "Invalid action, valid value is Generate"), null);
//            }
//        }));

    return router;
};