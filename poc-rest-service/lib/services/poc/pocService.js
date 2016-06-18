"use strict";
/*jshint loopfunc: true */

//3rd party libraries
var _ = require("underscore");
var assert = require("assert");
var events = require("events");

var async = require("async");
var moment = require("moment");

//Our libraries
var KwtrError = require("../../error/kwtrError");
var PreparedErrors = require("../../error/preparedErrors");
var sqlUtils = require("../../utils/sqlUtils");

module.exports = function Service (config) {

    assert(config.mongoLoman, "Connection to Mongo Loman DB is required");
    //assert(config.mysqlCore, "Connection to MySql core is required");

    var $mongoLoman = config.mongoLoman;
    //var $mysqlCore = config.mysqlCore;
    //var $mysqlEsg = config.mySql;

    var service = new events.EventEmitter();

    service.getMockData = function (lomansCode, callback) {
        service.emit("kwtr:debug", "my name is Loman and my code is %s", lomansCode);

        var fields = {};
        var options = {};
        var query = {};

        $mongoLoman.collection("TEST").find(query, fields, options).toArray(function (err, docs) {

            if (err) {
                return callback(new KwtrError({
                    errorCode: 1000, //TODO: Add a store error code
                    errorObj: "database",
                    message: err.message
                }));
            }

            var rawData = docs[0];

            if (_.isEmpty(rawData)) {
                return callback(new KwtrError({
                    errorCode: 1004,
                    errorObj: "Test",
                    message: "Test data cannot be found"
                }), null);
            }

//            var matrixOut = {
//                matrixTemplateId: rawMatrix._id.matrixTemplateId,
//                matrixTemplateName: rawMatrix.matrixTemplateName,
//                matrixOuterPostcode: rawMatrix.matrixOuterPostcode
//            };

            return callback(null, {data: rawData});
        });

    };


    return service;
};