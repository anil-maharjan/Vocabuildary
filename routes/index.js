var express	   = require("express"),
	router	   = express.Router(),
	mongoose   = require("mongoose"),
	Schema	   = mongoose.Schema,
	Unknown	   = require("../model/unknown");

// Root Route
router.get("/", function(req, res){
		res.render("index");
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
