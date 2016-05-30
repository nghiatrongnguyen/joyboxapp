var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.listen(7000);

var action, type, lens, resolution, subcategory, category;

var jsonContent;
var numberOfProduct;
var fs = require("fs");
var loadFromFile = false; 
var url_slbt = "https://extraction.import.io/query/extractor/8750898b-2d04-47bb-a406-aa3c207d0d30?_apikey=4381281dee5e41c0aff498e90be30be48590f27542bfc56d49826c34e7237006e65225418af05cd3f7c0dd5ca4f53faf84a2cbcaf3cedc166e56cf7832424f372e6502f82f2a611d25cb5000f612022d&url=http%3A%2F%2Fzeisicmienbac.com%2Ftim-kiem%3Fq%3Dslbt";
var request = require('request');

app.post('/joyboxws/',  function(req, res){
	
	console.log("JOYBOX WEB SERVICE");
	// get the parameters
	action = req.body.result.action
	console.log("request action: ", action);
	
	if(action == 'searchproduct'){
		type = req.body.result.parameters.Type;
		resolution = req.body.result.parameters.resolution;
		subcategory = req.body.result.parameters.Sub-category;
		lens = req.body.result.parameters.lens;
		category = req.body.result.parameters.category;
		
		queryProduct(category, subcategory, type, lens, resolution);
		res = makeFbResponse();
	}
	
	
});

function queryProduct(category, subcategory, type, lens, resolution){
	console.log("Query product");
	
}

	request({
			url: url_slbt,
		 }, function(error, response, body){
			 if(!error&&response.statusCode === 200){		 
				 console.log("\n LOADED DATA FROM ONLINE");
				 
				 jsonContent = JSON.parse(body);
				  // total number of products -> using URL				  
				console.log("body:", jsonContent);
				numberOfProduct = jsonContent.extractorData.data[0].group.length
				console.log("length: ", numberOfProduct);
			 }
			 else{
				 console.log("\n LOADING DATA FROM LOCAL");
				 contents = fs.readFileSync("data.json");
				 jsonContent = JSON.parse(contents);
				 // total number of products -> using URL
				numberOfProduct = jsonContent.result.extractorData.data[0].group.length;
				loadFromFile = true;	
			 }	 
			 console.log("\n LOAD DATA COMPLETED");
	 });
  

function makeFbResponse(){
	
	messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [],
      }
    }
  };
	for (i=0; i< 5; i++ ){
	  
		//item = jsonContent.result.extractorData.data[0].group[i];	
		
		// Ussing url
		item = jsonContent.extractorData.data[0].group[i];	
		
		var newElement = {
			  "title": "",
			  "subtitle": "",
			  "image_url": "",
			  "buttons": [{
				"type": "",
				"url": "",
				"title": ""
			  }, {
				"type": "",
				"title": "",
				"payload": "",
			  }],
			};
	 
		//console.log("item", item);
	 
		newElement.title = item["Listcontent link"][0].text;
		newElement.subtitle = "Giá bán: "+ item["Pricetext value"][0].text;
		newElement.image_url = item["Listcontent image"][0].src;
		newElement.buttons[0].type = "web_url";
		newElement.buttons[0].url = item["Listcontent link"][0].href;
		newElement.buttons[0].title = "Web link";
		
		newElement.buttons[1].type = "postback";
		newElement.buttons[1].title = "Bookmark item";
		newElement.buttons[1].payload = "payload";
		
		messageData.attachment.payload.elements.push(newElement);
	}
	
	return {
        "speech": "Found products are" ,
        "displayText": "Found products are",
        "data": {"facebook": messageData},
        "source": "apiai-weather-webhook-sample"
    }
	
}

