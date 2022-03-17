var http = require("http");
var server = http.createServer(handleServer);
function handleServer(req, res) {
  var store = "";
  req.on("data", (chunk) => {
    store = store + chunk;
  });
  req.on("end", () => {
    res.write(store);
    res.end();
  });
}
server.listen(3456);
