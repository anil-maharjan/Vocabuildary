// App configuration
var express 	= require("express"),
	app			= express(),
	request 	= require("request"),
	bodyParser  = require("body-parser"),
	mongoose  	= require("mongoose"),
	Vocabulary 	= require("./model/word"),
	Unknown 	= require("./model/unknown"),
	KnownWords  = require("./model/knownWords");

// Requiring routes
var indexRoutes		   = require("./routes/index"),
	learnRoutes		   = require("./routes/learn"),
	vocabuildaryRoutes = require("./routes/vocabuildary"),
	knownwordsRoutes   = require("./routes/knownWords");

// Database connection
mongoose.connect("mongodb://localhost:27017/vocabuildary", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//Use Routes
app.use(indexRoutes);
app.use("/knownWords", knownwordsRoutes);
app.use("/learnNplay", learnRoutes);
app.use("/vocabuildary", vocabuildaryRoutes);
	
app.listen("3000", function(){
	console.log("Servers are running");
})