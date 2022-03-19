// get relative path of index.js
console.log("../client/index.js");
// get absolute path of index.js
var path = require("path");
var absolutePath = path.join(__dirname, "..", "client/index.js");
console.log(absolutePath);
