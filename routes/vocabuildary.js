var express	   = require("express"),
	router	   = express.Router(),
	mongoose   = require("mongoose"),
	Schema	   = mongoose.Schema,
	Words 	   = require("../model/words"),
	Unknown	   = require("../model/unknown");

// To add New Words route
router.get("/", function(req, res){
	res.render("vocabuildary");
})

// To Add new Words and add it to unknown
router.post("/", function(req, res){
	console.log(req.user);
	var id = mongoose.Types.ObjectId();
	var obj1 = {
		_id: id,
		name: req.body.word.name,
		meaning: req.body.word.meaning,
		synonyms: req.body.word.synonyms,
		sentence: req.body.word.sentence 
	}

	var obj2 = {
		_id: id,
		name: req.body.word.name,
		meaning: req.body.word.meaning,
		synonyms: req.body.word.synonyms,
		sentence: req.body.word.sentence,
		count: 1,
		noOfSentence: 2,
		sentence: ""
	}
	var query1 = { _id: req.user.vid };
	Words.findById(query1, function(err, w){
		if(err)
			console.log(err);
		w.words.push(obj1);
		w.save();
	})

	var query = {_id: req.user.uid};
	console.log(query);
	Unknown.findById(query, function(err, word){
		if(err){
			console.log(err);
			}
				console.log(word);
					word.uWords.push(obj2);
					word.save();						
					res.redirect("/vocabuildary");
	})


})

module.exports = router;