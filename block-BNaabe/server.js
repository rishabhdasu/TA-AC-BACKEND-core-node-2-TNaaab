var fs = require("fs");
var path = require("path");
var absoultePath = __dirname;
var relative = __filename;
var formPath = path.join(__dirname, "index.html");

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
    if (req.method === "POST" && req.url === "/route") {
      console.log(store);
      res.setHeader("Content-Type", "application/json");
      res.end(store);
    }
    if (req.method === "POST" && req.url === "/form") {
      var parsedData = qs.parse(store);
      res.end(JSON.stringify(parsedData.captain));
    }
  });
}
server.listen(3000, () => {
  console.log("Server started at 3K");
});
