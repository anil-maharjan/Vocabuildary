var express	   = require("express"),
	router	   = express.Router(),
	mongoose   = require("mongoose"),
	Schema	   = mongoose.Schema,
	Vocabulary = require("../model/word"),
	Unknown	   = require("../model/unknown");

router.get("/", function(req, res){
	res.render("knownWords");
})

module.exports = router;