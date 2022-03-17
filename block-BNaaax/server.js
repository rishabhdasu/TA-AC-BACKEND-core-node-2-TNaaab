var path = require("path");
var absolute = __dirname;
var relative = __filename;

console.log(absolute, relative);

var formPath = path.join(__dirname, "server.js");

console.log(formPath);
