var http = require("http");

//print out message
function printMessage(zip, forecast) {
	var message = "The weather near " + zip + " is " + forecast + ".";
	console.log(message);
}

//print out error message
function  printError(error) {
	console.error(error.message);
}


function get(zip) {
	//Connect to API url (http://api.wunderground.com/api/cba099bd3bdba890/geolookup/q/94107.json)
	var request = http.get("http://api.wunderground.com/api/cba099bd3bdba890/geolookup/q/" + zip + ".json", function(response) {
		var body = "";
		//Read the data
		response.on('data', function (chunk) {
			body += chunk;
		});

		response.on("end", function() {
			if(response.statusCode == 200) {
				try {
					//parse the data
					var weatherObj = JSON.parse(body);
					
					//redirect
					var url = 'http:\/\/www.wunderground.com\/global\/stations\/' + weatherObj.location.wmo + '.html'
					response.writeHead(200,
						{Location: url}
					);
					response.end();

					//print the data
					printMessage(zip, weatherObj.location.city);
				} catch (error) {
					//parse error
					printError(error);
				}
			} else {
				//status code error
				printError({message: "There was an error getting the forecast for " + zip + ". ("
				+ http.STATUS_CODES[response.statusCode] + ")"});
			}

		});
	});
	
	//connection error
	request.on("error", printError);


}

module.exports.get = get;








