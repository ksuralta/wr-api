'use strict';

var test = require('tape'),
    path = require('path'),
    express = require('express'),
    jsYaml = require('js-yaml'),
    fs = require('fs'),
    enjoi = require('enjoi'),
    swaggerize = require('swaggerize-express'),
    request = require('supertest');

test('api', function (t) {
    var app = express();

    
    app.use(require('body-parser')());

    app.use(swaggerize({
        api: path.join(__dirname, './../config/petstore.json'),
        handlers: path.join(__dirname, '../handlers')
    }));

    
    t.test('test get /pets', function (t) {
        
        var responseSchema = enjoi({
            '$ref': "#/definitions/Pets"
        }, {
                subSchemas: {
                    '#':  require(Path.join(__dirname, './../config/petstore.json')) 
                }
        });
        

        request(app).get('/v1/pets')
        .end(function (err, res) {
            t.ok(!err, 'get /pets no error.');
            t.strictEqual(res.statusCode, 200, 'get /pets 200 status.');
            responseSchema.validate(res.body, function (error) {
                t.ok(!error, 'Response schema valid.');
            });
            t.end();
        });
    });
    
    t.test('test post /pets', function (t) {
        

        request(app).post('/v1/pets')
        .end(function (err, res) {
            t.ok(!err, 'post /pets no error.');
            t.strictEqual(res.statusCode, 201, 'post /pets 201 status.');
            t.end();
        });
    });
    

});
