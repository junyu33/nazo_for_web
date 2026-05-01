const { readFileSync } = require("fs");
const http = require("http");
const url = require("url");
const querystring = require("querystring");

const serv = http.createServer();

// Helper function to serve files with error handling
function serveFile(res, filePath, contentType = "text/html", statusCode = 200) {
    try {
        const data = readFileSync(filePath);
        res.writeHead(statusCode, { "Content-Type": contentType });
        res.end(data);
    } catch (error) {
        res.writeHead(500);
        res.end("Internal Server Error");
    }
}

serv.on("request", (req, res) => {
    const pathName = url.parse(req.url).pathname;
    console.log(pathName);

    // Handle GET requests
    if (req.method === "GET") {
        switch (pathName) {
            case "/": return serveFile(res, "./index.html");
            case "/css/style.css": return serveFile(res, "./css/style.css", "text/css");
            case "/img/code.png": return serveFile(res, "./img/code.png", "image/png");
            case "/img/level10.png": return serveFile(res, "./img/level10.png", "image/png");
            case "/js/ajax.js": return serveFile(res, "./js/ajax.js", "application/javascript");
            case "/favicon.ico": return serveFile(res, "./favicon.ico", "image/x-icon");
            case "/level1": return serveFile(res, "./level1.html");
            case "/2008": return serveFile(res, "./level2.html");
            case "/class": return serveFile(res, "./level3.html");
            case "/Lucida_Console": return serveFile(res, "./level4.html");
            case "/80439751": return serveFile(res, "./level5.html");
            case "/absolute": return serveFile(res, "./level6.html");
            case "/31337": return serveFile(res, "./level8.html");
            case "/All_of_them_can_be_used_as_backend": return serveFile(res, "./level9.html");
            case "/nodejs_flex_reverse_proxy": return serveFile(res, "./level10.html");
            case "/w3ll_d0n3": return serveFile(res, "./congrats.html");
            
            // Handle multiple NaN routes
            case "/NaN&0":
            case "/NaN|0":
            case "/NaN^0":
            case "/NaN=0":
                return serveFile(res, "./level7.html");
            
            default:
                return serveFile(res, "./err.html", "text/html", 404);
        }
    }

    // Handle POST requests
    if (req.method === "POST") {
        let postData = "";
        req.on("data", chunk => postData += chunk);
        req.on("end", () => {
            const post = querystring.parse(postData);
            if (post.R) {
                serveFile(res, "./answer.html");
            } else {
                serveFile(res, "./level8.html");
            }
        });
        return;
    }

    // Handle unsupported methods
    res.writeHead(405);
    res.end("Method Not Allowed");
});

serv.listen("1234", "0.0.0.0", () => {
    console.log("Server is running on http://0.0.0.0:1234");
});
