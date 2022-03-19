var http = require("http");

var server = http.createServer(handlServer);
var querystring = require("querystring");
var fs = require("fs");
function handlServer(req, res) {
  var store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (req.method === "GET" && req.url === "/form") {
      res.setHeader("Content-Type", "text/html");
      fs.createReadStream("./form.html").pipe(res);
    }
    if (req.method === "POST" && req.url === "/form") {
      var parsedData = querystring.parse(store);
      res.setHeader("Content-Type", "text/html");
      res.end(
        `<h2>${parsedData.name}</h2><h3>${parsedData.email}</h3><h4>${parsedData.age}</h4>`
      );
    }
  });
}
server.listen(5678, () => {
  console.log("Sever started at 5678");
});
