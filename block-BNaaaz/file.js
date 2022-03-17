var http = require("http");
var fs = require("fs");
var server = http.createServer(handleServer);
function handleServer(req, res) {
  res.setHeader("Content-Type", "text/plain");
  fs.createReadStream("./read.txt").pipe(res);
}
server.listen(5000);
