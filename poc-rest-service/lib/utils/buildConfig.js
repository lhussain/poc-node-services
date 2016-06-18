"use strict";

//3rd party libraries
var MongoClient = require("mongodb").MongoClient;
var async = require("async");


function handleError (err) {
    console.error("Failure to start process:", err.message);
    console.error("Stack is:", err.stack);
    process.exit(-1);
}

function buildConfig (next) {
    async.waterfall([
        function (cb) {
            cb(null, {test: "test-config"});
        }

    ], function (err, config) {
        if (err) {
            handleError(err);
        }

        next(config);
    });
}

//defines the public api for this class
module.exports = {
    buildConfig : buildConfig
};