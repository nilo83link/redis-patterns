
exports.logger = function() {

    var config = require('../../conf/config.js');
    //console.log(config.log.path)

    var winston = require('winston');

    var logger =  new (winston.Logger)({

        transports : [
            new (winston.transports.Console)(),
            new (winston.transports.File)({
                handleExceptions: true,
                filename : config.log.path,
                level: config.log.level,
                colorize: true,
                json: false
            })
        ],
        exitOnError: false
    });


    return logger;

};
