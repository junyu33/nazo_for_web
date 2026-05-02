const { readFileSync } = require("fs");
const path = require("path");
const url = require("url");
const querystring = require("querystring");

function serveFile(res, filePath, contentType = "text/html", statusCode = 200) {
  try {
    const absPath = path.join(process.cwd(), filePath);
    const data = readFileSync(absPath);

    res.statusCode = statusCode;
    res.setHeader("Content-Type", contentType);
    res.end(data);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
}

async function readBody(req) {
  let body = "";

  await new Promise((resolve, reject) => {
    req.on("data", (chunk) => {
      body += chunk;

      // Avoid accepting unexpectedly large POST bodies.
      if (body.length > 64 * 1024) {
        reject(new Error("Payload too large"));
      }
    });

    req.on("end", resolve);
    req.on("error", reject);
  });

  return body;
}

function normalizePath(pathName) {
  const normalized = pathName.replace(/\/+$/, "");
  return normalized === "" ? "/" : normalized;
}

module.exports = async function handler(req, res) {
  const pathName = normalizePath(url.parse(req.url).pathname);

  if (req.method === "GET") {
    switch (pathName) {
      case "/":
        return serveFile(res, "index.html");

      case "/css/style.css":
        return serveFile(res, "css/style.css", "text/css");

      case "/img/code.png":
        return serveFile(res, "img/code.png", "image/png");

      case "/img/level10.png":
        return serveFile(res, "img/level10.png", "image/png");

      case "/js/ajax.js":
        return serveFile(res, "js/ajax.js", "application/javascript");

      case "/favicon.ico":
        return serveFile(res, "favicon.ico", "image/x-icon");

      case "/level1":
        return serveFile(res, "level1.html");

      case "/2008":
        return serveFile(res, "level2.html");

      case "/class":
        return serveFile(res, "level3.html");

      case "/Lucida_Console":
        return serveFile(res, "level4.html");

      case "/80439751":
        return serveFile(res, "level5.html");

      case "/absolute":
        return serveFile(res, "level6.html");

      case "/NaN&0":
      case "/NaN|0":
      case "/NaN^0":
      case "/NaN=0":
        return serveFile(res, "level7.html");

      case "/31337":
        return serveFile(res, "level8.html");

      case "/All_of_them_can_be_used_as_backend":
        return serveFile(res, "level9.html");

      case "/nodejs_flex_reverse_proxy":
        return serveFile(res, "level10.html");

      case "/w3ll_d0n3":
        return serveFile(res, "congrats.html");

      default:
        return serveFile(res, "err.html", "text/html", 404);
    }
  }

  if (req.method === "POST") {
    try {
      const body = await readBody(req);
      const post = querystring.parse(body);

      res.setHeader("Cache-Control", "no-store");

      if (
        pathName === "/31337" &&
        Object.prototype.hasOwnProperty.call(post, "answer")
      ) {
        return serveFile(res, "answer.html");
      }

      return serveFile(res, "level8.html");
    } catch {
      res.statusCode = 413;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Payload Too Large");
    }

    return;
  }

  res.statusCode = 405;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("Method Not Allowed");
};
