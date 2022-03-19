## BLOCK-writeCode

#### Path

Q. Suppose we have 3 files inside a directory on desktop
The structure is

- node(folder) - app.js - server.js - index.html
  You are currently inside server.js

Write code to

- capture absolute path of `server.js`(itself)
- get absolute path of `app.js`
- get realtive path of `index.html`
- get absolute path of `index.html` using `path module`

#### Capture data on server

Q. Create a server using http

- handle post method on '/' route
- send json data on it from postman

```js
// data format is
{
  team: 'kxip',
  players: 18,
  captain: 'KL Rahul'
}
```

- capture data from request on server side using data and end event on request object
- when end event fires, send entire captured data in response with status code 201.

Q. Follow above steps with form data from postman instead of json data.

- once data has been captured, send only captain's name in response.

```js
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
```

Q. Create server which can handle both json/form data without specifying which format of data is being received.

- add listener on port 9000
- use `data/end` event to capture json/form data
- use `req.headers['Content-Type']` to check data format
- parse respective data format i.e. json/form
- send entire data in response
- data sent from postman should have fields:

  - city
  - state
  - country
  - pin

  ```js
  var http = require("http");
  ```

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
res.end(store);
}
});
}
server.listen(4000, () => {
console.log("Server started at 4K");
});

```

Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.

- format of json data is {name: your name, email: "", }
- Html response format is <h1>Name</h1><h2>email</h2>

Q. Follow above question with form data containing fields i.e name and email.

- Parse form-data using `querystring` module
- respond with HTML page containing only email from data in H2 tag.

#### Note:-

Make sure to convert objects into strings using `JSON.stringify` before passing the data through response.
```

```js
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
```
