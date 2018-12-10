var express	   = require("express"),
	router	   = express.Router(),
	mongoose   = require("mongoose"),
	Schema	   = mongoose.Schema,
	Unknown	   = require("../model/unknown"),
	KnownWords = require("../model/knownWords");

router.get("/", function(req, res){
	var query = {_id: req.user.kid};		 
	KnownWords.findById(query).populate("kWords").exec(function(err, kWords){
		if(err)
			console.log(err);	
		console.log(kWords);
		res.render("knownwords", {kWrdsObj: kWords});
	})
})

module.exports = router;