'use strict';

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var swaggerize = require('swaggerize-express');
var path = require('path');

var app = express();

var server = http.createServer(app);

app.use(bodyParser.json());

app.use(swaggerize({
    api: path.resolve('./config/petstore.json'),
    handlers: path.resolve('./handlers')
}));

app.set('port', (process.env.PORT || 8000));

server.listen(app.get('port'), function () {
    app.swagger.api.host = server.address().address + ':' + server.address().port;
});
