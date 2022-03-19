var http = require("http");

var qs = require("querystring");

var server = http.createServer(handleServer);

function handleServer(req, res) {
  var store = "";

  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
      var formData = qs.parse(store);
      res.end(JSON.stringify(formData));
    }
    if (req.headers["content-type"] === "application/json") {
      var jsonData = JSON.parse(store);
      res.setHeader("Content-Type", "text/html");
      res.end(`<h2>${jsonData.name}</h2><p>${jsonData.email}</p>`);
    }
  });
}
server.listen(4000, () => {
  console.log("Server started at 4K");
});
