
var weatherForecast = require("./script.js");
console.dir(process.argv);


var zipCode = process.argv[2];

weatherForecast.get(zipCode);