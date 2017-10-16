var express=require('./config/express');
var mongodb=require('./config/mongoose');

var db=mongodb();
var app=express();

var config = require('./config/config');

app.listen(config.port, function(){
    console.log('app started, listening on port:', config.port);
});