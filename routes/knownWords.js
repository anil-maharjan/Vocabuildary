var express	   = require("express"),
	router	   = express.Router(),
	mongoose   = require("mongoose"),
	Schema	   = mongoose.Schema,
	middleware = require("../middleware"),
	Unknown	   = require("../model/unknown"),
	KnownWords = require("../model/knownWords");

router.get("/", middleware.isLoggedIn, function(req, res){
	var query = {_id: req.user.kid };
	KnownWords.findById(query).populate('words').exec(function(err, kWords){
		if(err){
			return console.log(err);
		}
		res.render("knownwords", {kWrdsObj: kWords});
	})
})

module.exports = router;