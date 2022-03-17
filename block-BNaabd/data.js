var http = require("http");
var qs = require("querystring");
var server = http.createServer(handleServer);
function handleServer(req, res) {
  var store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (req.method === "POST" && req.url === "/json") {
      console.log(store);
      res.setHeader("Content-Type", "application/json");
      res.end(store);
    }
    if (req.method === "POST" && req.url === "/form") {
      var parsedData = qs.parse(store);
      res.end(JSON.stringify(parsedData));
    }
  });
}

server.listen(7000, () => {
  console.log("Server started at 7K");
});
