const { readFileSync, rmSync } = require("fs");
const http = require("http");
const url = require("url");

var serv=http.createServer();
var request = require('request');
var querystring = require('querystring');
var util = require('util');

serv.on("request",(req,res)=>{
    var pathName=url.parse(req.url).pathname;
    console.log(pathName);

    switch(pathName){
        case "/":
            var data = readFileSync("./index.html");
            res.end(data);
            break;
        case "/css/style.css":
            var data = readFileSync("./css/style.css");
            res.end(data);
            break;
        case "/img/code.png":
            var data = readFileSync("./img/code.png");
            res.end(data);
            break;
        case "/img/level10.png":
            var data = readFileSync("./img/level10.png");
            res.end(data);
            break;
        case "/js/ajax.js":
            var data = readFileSync("./js/ajax.js");
            res.end(data);
            break;
        case "/favicon.ico":
            var data = readFileSync("./favicon.ico");
            res.end(data);
            break;
        case "/level1":
            var data = readFileSync("./level1.html");
            res.end(data);
            break;
        case "/2007":
            var data = readFileSync("./level2.html");
            res.end(data)
            break;
        case "/class":
            var data = readFileSync("./level3.html");
            res.end(data)
            break;
        case "/Lucida_Console":
            var data = readFileSync("./level4.html");
            res.end(data);
            break;
        case "/80439751":
            var data = readFileSync("./level5.html");
            res.end(data);
            break;
        case "/absolute":
            var data = readFileSync("./level6.html");
            res.end(data);
            break;
        case "/NaN&0":
            var data = readFileSync("./level7.html");
            res.end(data);
            break;
        case "/NaN|0":
            var data = readFileSync("./level7.html");
            res.end(data);
            break;
        case "/31337":
            var data = readFileSync("./level8.html");
            break;
        case "/All_of_them_can_be_used_as_backend":
            var data = readFileSync("./level9.html");
            res.end(data);
            break;
        case "/ajax":
            var data = readFileSync("./level10.html");
            res.end(data);
            break;
        case "/w3ll_d0n3":
            var data = readFileSync("./congrats.html");
            res.end(data);
            break;
        default:
            var data = readFileSync("./err.html");
            res.writeHead(404, {"Content-Type":"text/html; charset=utf-8"});
            res.end(data);
            break;  
    }
    
    var post = '';     
    req.on('data', function(chunk){    
        post += chunk;
    });
 
    req.on('end', function(){    
        post = querystring.parse(post);
        if ( post.Go != undefined) {
            res.writeHead(200, {'my_server': 'Node.js'});
            var data = readFileSync("./answer.html");
            res.end(data);
        } else {
            var data = readFileSync("./level8.html");
            res.end(data);
        }
        return;
    });
});


serv.listen("80",()=>{
    console.log("serv running on http://127.0.0.1:80");
});