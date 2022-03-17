var http = require("http");
var qs = require("querystring");
var server = http.createServer(handleServer);
function handleServer(req, res) {
  var store = "";
  var dataFormat = req.headers["content-type"];
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (dataFormat === "application/json") {
      var parsedData = JSON.parse(store);
      res.end(store);
    }
    if (dataFormat === "application/x-www-form-urlencoded") {
      var parsedData = qs.parse(store);
      res.end(JSON.stringify(parsedData));
    }
  });
}

server.listen(7000, () => {
  console.log("Server started at 7K");
});
