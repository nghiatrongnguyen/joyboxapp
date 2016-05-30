var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.listen(7000);

app.post('/joyboxws/',  function(req, res){
	
	console.log("JOYBOX WEB SERVICE");
	
	console.log("body: ",req.body);
	
	var jsonPost = JSON.parse(req.body);
	console.log("request. body: ", jsonPost.body);	
	console.log("action: ", jsonPost.result.action);
	
	
});