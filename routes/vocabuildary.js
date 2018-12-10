var express	   = require("express"),
	router	   = express.Router(),
	mongoose   = require("mongoose"),
	Schema	   = mongoose.Schema,
	Unknown	   = require("../model/unknown");

// To add New Words route
router.get("/", function(req, res){
	res.render("vocabuildary");
})

// To Add new Words and add it to unknown
router.post("/", function(req, res){
	console.log(req.user);
	var query = {_id: req.user.uid};
	console.log(query);
	Unknown.findById(query, function(err, word){
		if(err){
			console.log(err);
			}
				console.log(word);
					word.uWords.push(req.body.word);
					word.save();						
					res.redirect("/vocabuildary");
	})
})

module.exports = router;