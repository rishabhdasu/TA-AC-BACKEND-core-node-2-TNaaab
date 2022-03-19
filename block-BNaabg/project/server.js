var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var url = require("url");
var userDir = __dirname + "/users/";

var server = http.createServer(handleServer);

function handleServer(req, res) {
  var store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (req.method === "POST" && req.url === "/users") {
      var username = JSON.parse(store).username;
      fs.open(userDir + username + ".json", "wx", (err, userData) => {
        if (err) console.log(err);
        console.log(userData);
        fs.writeFile(userData, store, (err) => {
          if (err) console.log(err);
          fs.close(userData, () => {
            res.end("User Created");
          });
        });
      });
      res.end(username);
    }
    res.statusCode = 404;
    res.end("Page not found");
  });
}

server.listen(4000, () => {
  console.log("Server is listening to the port 4K");
});
