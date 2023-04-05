const { readFileSync } = require("fs");
const http = require("http");
const url = require("url");

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser());

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '20.191.185.135',
  user     : 'root',
  password : 'KCrsax4aesEydYeH',
  database : 'nazo_answer'
});

connection.connect();

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
   var route = req.params[0];
   connection.query('SELECT `PATH` FROM `ANSWER` WHERE `ROUTE` = "' + route + '"', function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
         var data = readFileSync("./" + results[0].PATH);
         res.end(data);
      } else {
         res.writeHead(404, {'Content-Type': 'text/html'})
         var data = readFileSync("./err.html");
         res.end(data);
      }
   });
});



app.listen("1234",()=>{
    console.log("serv running on http://127.0.0.1:1234");
});
