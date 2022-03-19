var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var url = require("url");
var userDir = __dirname + "/users/";

var server = http.createServer(handleServer);

function handleServer(req, res) {
  var parsedUrl = url.parse(req.url, true);
  var store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (req.method === "POST" && req.url === "/users") {
      var username = JSON.parse(store).username;
      fs.open(userDir + username + ".json", `wx`, (err, fd) => {
        if (err) return console.log(err);
        fs.writeFile(fd, store, (err) => {
          if (err) return console.log(err);
          fs.close(fd, () => {
            return res.end(`${username} is created successfully`);
          });
        });
      });
    }
    if (parsedUrl.pathname === "/users" && req.method === "GET") {
      var username = parsedUrl.query.username;
      fs.readFile(userDir + username + `.json`, (err, content) => {
        if (err) return console.log(err);
        res.setHeader("Content-Type", "application/json");
        return res.end(content);
      });
    }
    if (parsedUrl.pathname === "/users" && req.method === "PUT") {
      var username = parsedUrl.query.username;
      fs.open(userDir + username + `.json`, `r+`, (err, fd) => {
        if (err) return console.log(err);
        fs.ftruncate(fd, (err) => {
          if (err) return console.log(err);
          fs.write(fd, store, (err) => {
            if (err) return console.log(err);
            fs.close(fd, () => {
              return res.end(`${username} is successfully updated`);
            });
          });
        });
      });
    }
    if (parsedUrl.pathname === "/users" && req.method === "DELETE") {
      var username = parsedUrl.query.username;
      fs.unlink(userDir + username + ".json", (err) => {
        if (err) return console.log(err);
        return res.end(`${username} is successfully deleted`);
      });
    }
    res.statusCode = 404;
    res.end("Page Not Found");
  });
}

server.listen(4000, () => {
  console.log("Server is listening to the port 4K");
});
