"use strict";
/*jshint loopfunc: true */

//3rd party libraries
var _ = require("underscore");
var assert = require("assert");
var events = require("events");

var async = require("async");
var moment = require("moment");

//Our libraries
var GeopostError = require("../../error/kwtrError");
var PreparedErrors = require("../../error/preparedErrors");
var sqlUtils = require("../../utils/sqlUtils");

module.exports = function Service (config) {

    //assert(config.mongoDepot, "Connection to Mongo Depot DB is required");
    //assert(config.mysqlCore, "Connection to MySql core is required");

    //var $mongoDepot = config.mongoDepot;
    //var $mysqlCore = config.mysqlCore;
    //var $mysqlEsg = config.mySql;

    var service = new events.EventEmitter();

    service.getMockData = function (lomansCode, callback) {
        service.emit("kwtr:debug", "my name is Loman and my code is %s", lomansCode);

        callback(null, {helloWorld: "Loman's code is: " + lomansCode});
    };


    return service;
};