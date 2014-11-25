var config = {};

/** ******************** */
/* CONFIGURAZIONI APP */
/** ******************* */
config.web = {};

// porta della app
config.web.port = 5000;

//base path
config.web.basePath = '/redis-patterns';

// Abilita il logging su tutte le chiamate
config.web.logcalls = false;

/** ******************* */
/* CONFIGURAZIONI LOG */
/** ******************* */
config.log = {};

// path dei log
config.log.path = '/var/log/redis-patterns.log';

// livello di loggin info/warn/error
config.log.level = 'debug'; // S

config.log.size = 5120000;

module.exports = config;

