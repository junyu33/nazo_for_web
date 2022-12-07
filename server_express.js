const { readFileSync } = require("fs");
const http = require("http");
const url = require("url");

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser());


app.get('/', function(req, res) {
    var data = readFileSync("./index.html");
    res.end(data);
});
app.get('/css/style.css', function(req, res) {

      var data = readFileSync("./css/style.css");
      res.end(data);
});
app.get('/img/code.png', function(req, res) {

      var data = readFileSync("./img/code.png");
      res.end(data);
});
app.get('/img/level10.png', function(req, res) {
   var data = readFileSync("./img/level10.png");
   res.end(data);
});
app.get('/js/ajax.js', function(req, res) {
   var data = readFileSync("./js/ajax.js");
   res.end(data);
});
app.get('/favicon.ico', function(req, res) {
   var data = readFileSync("./favicon.ico");
   res.end(data);
});
app.get('/level1', function(req, res) {
   var data = readFileSync("./level1.html");
   res.end(data);
});
app.get('/2007', function(req, res) {
   var data = readFileSync("./level2.html");
   res.end(data);
});
app.get('/class', function(req, res) {
   var data = readFileSync("./level3.html");
   res.end(data);
});
app.get('/Lucida_Console', function(req, res) {
   var data = readFileSync("./level4.html");
   res.end(data);
});
app.get('/80439751', function(req, res) {
   var data = readFileSync("./level5.html");
   res.end(data);
});
app.get('/absolute', function(req, res) {
   var data = readFileSync("./level6.html");
   res.end(data);
});
app.get('/NaN&0', function(req, res) {
   var data = readFileSync("./level7.html");
   res.end(data);
});
app.get('/NaN|0', function(req, res) {
   var data = readFileSync("./level7.html");
   res.end(data);
});
app.get('/31337', function(req, res) {
   var data = readFileSync("./level8.html");
   res.end(data);
});
app.get('/All_of_them_can_be_used_as_backend', function(req, res) {
   var data = readFileSync("./level9.html");
   res.end(data);
});
app.get('/ajax', function(req, res) {
   var data = readFileSync("./level10.html");
   res.end(data);
});
app.get('/w3ll_d0n3', function(req, res) {
   var data = readFileSync("./congrats.html");
   res.end(data);
});
app.post('/31337', function(req, res) {
   if ( req.body.Go != undefined) {
      var data = readFileSync("./answer.html");
      res.end(data);
   } else {
      var data = readFileSync("./level8.html");
      res.end(data);
   }
});
app.get('*', function(req, res) {
   var data = readFileSync("./err.html");
   res.end(data);
});



app.listen("80",()=>{
    console.log("serv running on http://127.0.0.1:80");
});