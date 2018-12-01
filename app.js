var express = require("express"),
	app		= express(),
	request = require("request"),
	bodyParser = require("body-parser"),
	mongoose  = require("mongoose"),
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

// To Add new Words and add it to unknown
app.post("/vocabuildary", function(req, res){
	var query = {_id: "5c0260c80de7fa15986dfb17"};
	Unknown.findById(query, function(err, word){
		if(err){
			console.log(err);
			}
			Vocabulary.create(req.body.word, function(err, new_word){
				if(err){
					console.log(err);
				}else{
					var uWords = {
						_id: mongoose.Types.ObjectId(new_word._id),
						count: 10,
						noOfSentence: 2,
						sentence: ""
					};
					word.words.push(uWords);
					word.save();						
					res.redirect("/vocabuildary");
				}
			})
	})
	
})

// To add unknown words
app.post("/unknown", function(req, res){
	Unknown.create({}, function(err, uWord){
		if(err){
			console.log(err);
		}else{
			res.redirect("/");
		}
	})

})

app.get("/learnNplay", function(req, res){
	var query = { _id: "5c021e9d01a4082bd805b8d8" };
Unknown.find({}).populate("words._id").exec(function(err, uk){
	 if(err){
	 	console.log(err);
	 	} 
	 	var flag = true; //to secure rightId is taken only once
	 	var rand = 0; 
	 	var arrWords = []; //this will hold 4 words meaning
	 	var rand2 = Math.floor(Math.random()*4); //to get a random value between 0 and 3 which will be the right words index
	 	for(var i=0; i<4; i++){
	 		rand = Math.floor(Math.random()*10); //get a random meaning from 0 - 9
	 		console.log(rand);
	 		arrWords[i] = uk[0].words[rand]._id.meaning;
	 		if(flag===true){
	 			if(rand2 === i)
	 			{
	 				var rightId = uk[0].words[rand]._id._id;
	 				var rightName = uk[0].words[rand]._id.name;
	 				console.log(rightId);
	 				console.log(rightName);
	 				flag = false;
	 			}
	 		}	
	 	}
	 	console.log(arrWords);
	 	// R stands for Right
	 	res.render("PlayAndLearn", {allUWords: uk, R_name: rightName, R_id: rightId, R_index: rand2, arrWords: arrWords})
	})
})

	
app.listen("3000", function(){
	console.log("Servers are running");
})