var express = require("express"),
	app		= express(),
	request = require("request"),
	bodyParser = require("body-parser"),
	mongoose  = require("mongoose"),
	Schema	= mongoose.Schema,
	Vocabulary = require("./model/word"),
	Unknown = require("./model/unknown");

mongoose.connect("mongodb://localhost:27017/vocabuildary", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// Root Route
app.get("/", function(req, res){
	Vocabulary.find({}, function(err, foundWord){
		if(err){
			console.log(err);
		}else{
			res.render("index",{words: foundWord});
		}
	})
})

// To add New Words route
app.get("/vocabuildary", function(req, res){
	res.render("vocabuildary");
})

// To Add new Words
app.post("/vocabuildary", function(req, res){
	Vocabulary.create(req.body.word, function(err, newWord){
		if(err){
			console.log(err);
		}else{
			res.redirect("/vocabuildary");
		}
	})
})

// To add unknown words
app.post("/unknown", function(req, res){
	
	var uWords = {
		wid: req.body.id,
		count: 10,
		noOfSentence: 2,
		Sentence: ""
	}

	// "5bfd3d2e4e8f13273cc87acd"
	var query = {
		_id: "5bfd3d2e4e8f13273cc87acd" 
	}
	Unknown.findById(query, function(err, foundUk){
		if(err){
			console.log(err);
		}else{
			foundUk.words.push(uWords);
			foundUk.save();
			res.redirect("/");
			console.log(uWords);
		}
		})
})

	// })
	// Unknown.create(uWords, function(err, uWord){
	// 	if(err){
	// 		console.log(err);
	// 	}else{
	// 		console.log(uWord.id);
	// 		res.redirect("/");
	// 	}
	// })



app.listen("3000", function(){
	console.log("Servers are running");
})