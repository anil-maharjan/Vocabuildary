var express	   = require("express"),
	router	   = express.Router(),
	mongoose   = require("mongoose"),
	Schema	   = mongoose.Schema,
	Vocabulary = require("../model/word"),
	Unknown	   = require("../model/unknown");

// To add New Words route
router.get("/", function(req, res){
	res.render("vocabuildary");
})

// To Add new Words and add it to unknown
router.post("/", function(req, res){
	var query = {_id: "5c058ca44ba8de0e18333042"};
	Unknown.find(query, function(err, word){
		if(err){
			console.log(err);
			}
			Vocabulary.create(req.body.word, function(err, new_word){
				if(err){
					console.log(err);
				}else{
					var uWords = {
						_id: mongoose.Types.ObjectId(new_word._id),
						count: 1,
						noOfSentence: 2,
						sentence: ""
					};
					word[0].words.push(uWords);
					word[0].save();						
					res.redirect("/vocabuildary");
				}
			})
	})
})

module.exports = router;