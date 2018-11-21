var express = require("express"),
	app		= express();
	request = require("request");

app.set("view engine", "ejs");

app.get("/vocabuildary", function(req, res){
	res.render("index");
})


app.listen("3000", function(){
	console.log("Servers are running");
})