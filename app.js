const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
//Body Parser
app.use (bodyParser.urlencoded({extended: true}));
//Static Folder
app.use(express.static(__dirname));
// Tracking HTML File
app.get("/", function(req, res){
	res.sendFile(__dirname + "/signup.html");
});
//Signup Route
app.post("/", function (req, res) {
	const firstName = req.body.fName; 
	const lastName = req.body.lName; 
	const email = req.body.email1; 
//Construct Requesting data 
	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName
				}
			}
		]
	};

//  Stringify inputed data 
const jsonData = JSON.stringify(data);

// url = "https://<data center>.api.mailchimp.com/3.0/lists/{listID}";
const url = "https://us18.api.mailchimp.com/3.0/lists/cead5b43ff";

const options = {
	method: "POST",
	auth: "anna1:30e88f3ba8252b1d3edfce5c41aceb0a-us18"
};
// Requesting and send back our data to mailchimp 
const request = https.request(url, options, function(response){
//Checking our code statment 
	if (response.statusCode === 200) {
		res.sendFile(__dirname + "/success.html")
	} else {
		res.sendFile(__dirname + "/failure.html")
	};

	response.on("data", function(data){
		console.log(JSON.parse(data));
	});
});
// Showing the status code on hyper terminal
request.write(jsonData);
// Ending Code
request.end();
});
//  from Failure page to Signup page 
app.post("/failure", function(req, res){
	res.redirect("/");
});



// Our Server PORT Starter 
app.listen(process.env.PORT || 3000, function(){
	console.log("Server is running on port 3000");
});

//API Key 30e88f3ba8252b1d3edfce5c41aceb0a-us18

// List ID cead5b43ff

