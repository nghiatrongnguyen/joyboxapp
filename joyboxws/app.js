var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.listen(8000);

app.post('/joyboxws',  function(req, res)){
	
	console.log("JOYBOX WEB SERVICE");
	console.log("receved: ", req);
	
	var jsonPost = JSON.parse(req);
	
}