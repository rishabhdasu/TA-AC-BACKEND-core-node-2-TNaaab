var fs = require("fs");
var path = require("path");
//capture absolute path of `server.js`(itself)
var absoluteCurr = __filename;
console.log(absoluteCurr);
//get absolute path of `app.js`
var absoulteDir = __dirname;
console.log(absoulteDir + "/app.js");
// get realtive path of `index.html`
console.log("./index.html");
//get absolute path of `index.html` using `path module`
var absPath = path.join(__dirname, "index.html");
console.log(absPath);
// Captue Data

var http = require("http");
var qs = require("querystring");
var server = http.createServer(handleServer);
function handleServer(req, res) {
  var store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    res.statusCode = 201;
    if (req.method === "POST" && req.url === "/") {
      console.log(store);
      res.setHeader("Content-Type", "application/json");
      res.end(store);
    }
    if (req.method === "POST" && req.url === "/") {
      var parsedData = qs.parse(store);
      res.end(JSON.stringify(parsedData.captain));
    }
  });
}
server.listen(3000, () => {
  console.log("Server started at 3K");
});
