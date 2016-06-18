"use strict";

function _connectionFromPool ($pool, fn, callback) {
    $pool.getConnection(function (err, connection) {
        if (err)
            return callback(err);

        fn(connection, function (err, result) {
            connection.release();
            if (err)
                return callback(err);

            callback(null, result);
        });

    });

}

function _withinTransaction (connection, fn, callback) {
    connection.beginTransaction(function (err) {
        if (err)
            return callback(err);

        fn(connection, function (err, result) {
            if (err) {
                connection.rollback();
                return callback(err);
            }

            connection.commit(function (err) {
                if (err) {
                    connection.rollback();
                    return callback(err);
                }

                callback(null, result);
            });
        });
    });
}

function usingTransactionFromPool ($pool, fn, callback) {
    _connectionFromPool($pool, function (connection, releaseFn) {
        _withinTransaction(connection, fn, releaseFn);
    }, callback);
}

module.exports = {
    usingTransactionFromPool: usingTransactionFromPool
};