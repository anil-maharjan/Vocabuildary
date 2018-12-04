var express	   = require("express"),
	router	   = express.Router(),
	mongoose   = require("mongoose"),
	Schema	   = mongoose.Schema,
	Vocabulary = require("../model/word"),
	unknown	   = require("../model/unknown");

// Root Route
router.get("/", function(req, res){
	Vocabulary.find({}, function(err, foundWord){
		if(err){
			console.log(err);
		}else{
			res.render("index",{words: foundWord});
		}
	})
})



// To add unknown words
router.post("/unknown", function(req, res){
	Unknown.create({}, function(err, uWord){
		if(err){
			console.log(err);
		}else{
			res.redirect("/");
		}
	})
})

module.exports = router;
