var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.listen(7000);

app.post('/joyboxws/',  function(req, res){
	
	console.log("JOYBOX WEB SERVICE");
	
	var jsonPost = JSON.parse(req);
	console.log("request. body: ", jsonPost.body);
	console.log("action: ", jsonPost.body.result.action);
	
	
});