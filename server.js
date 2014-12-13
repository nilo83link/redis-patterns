var express =       require('express');
var bodyParser =    require('body-parser');
var redis =         require('redis');

var config =        require('./conf/config.js');
var logger =        require('./app/utils/logger').logger();

var routesRedis = require('./app/routes/redis');

var app = module.exports = express();
app.engine('.html', require('ejs').__express);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(express.json());       // to support JSON-encoded bodies
//app.use(express.favicon(__dirname + '/public/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.responseTime());
app.use(express.compress());

app.set('view engine', 'html');
app.set('port', (process.env.PORT || config.web.port));

app.get(config.web.basePath, function(request, response) {
    response.render('index', {title: 'Redis pattern page'});
});

app.get('/redis/config', routesRedis.getConfig);
app.post('/redis/getKeyValue', routesRedis.getKeyValue);

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port') + config.web.basePath);
});
