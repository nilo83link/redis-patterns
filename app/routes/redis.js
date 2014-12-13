var redis = require('redis');
var format = require("string-template");

var logger = require('../utils/logger').logger();
var redisConfig = require('../../conf/cluster-config.json');

exports.getKeyValue = function (request, response) {

    var redisHost = redisConfig.host;
    var redisPort = redisConfig.port;

    var type = request.body.type;
    var key = request.body.key;
    var redisDb = request.body.redisDb;

    var numVariable = request.body.numVariable;
    var variables = [];
    for (var k=0; k<numVariable; k++) {
        var variable = request.body[k + "_variable"];
        variables.push(variable)
    }
    //logger.info("variables: " + variables)

    var complexKey = format(key, variables);

    logger.info("redisDb: " + redisDb)
    logger.info("type: " + type)
    logger.info("Key: " + complexKey);

    var redisClient = redis.createClient(redisPort, redisHost);
    redisClient.select(redisDb, function(err) {

        if (type == "HGETALL") {
            redisClient.hgetall(complexKey, function(err, reply){
                if(err){
                    logger.info(err);
                    throw err;
                }

                logger.debug(reply);
                response.json(reply);
            });
        } else if (type == "GET") {
            redisClient.get(complexKey, function(err, reply){
                if(err){
                    logger.info(err);
                    throw err;
                }

                logger.debug(reply);
                response.json(reply);
            });
        } else if (type == "LRANGE") {
            redisClient.lrange(complexKey, 0, -1, function(err, reply){
                if(err){
                    logger.info(err);
                    throw err;
                }

                logger.debug(reply);
                response.json(reply);
            });
        }
    });
}

exports.getConfig = function(request, response) {

    logger.info(redisConfig);
    var patterns = redisConfig.patterns;

    for(var i = 0; i<patterns.length; i++) {
        var pattern = patterns[i];
        var key = pattern.key;
        var variables = pattern.variables;

        var nullArray = [];
        for(var j = 0; j<variables.length; j++) {
            nullArray.push("|");
        }

        var trueKey = format(key, variables);
        logger.info("trueKey: " + trueKey);

        var complexKey = format(key, nullArray);
        var complexKeyArray = complexKey.split("|", 5);

        //logger.info("Variables array length " + variables.length);
        //logger.info("Null array length " + nullArray.length);
        //logger.info("ComplexKey " + complexKey);

        var keyArray = [];
        for(var j = 0; j<complexKeyArray.length-1; j++) {
            var complexKeyEelement = complexKeyArray[j];
            //logger.info(j + " " + complexKeyEelement);
            keyArray.push(complexKeyEelement);
            keyArray.push("");
        }
        pattern.keyArray = keyArray;
    }

    var jsonResp = {};
    jsonResp["patterns"] = patterns;

    logger.info(jsonResp);

    response.render('keys', jsonResp);
}
