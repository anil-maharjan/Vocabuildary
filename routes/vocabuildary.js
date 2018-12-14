var express	   = require("express"),
	router	   = express.Router(),
	mongoose   = require("mongoose"),
	Schema	   = mongoose.Schema,
	middleware = require("../middleware"),
	Words 	   = require("../model/words"),
	Unknown	   = require("../model/unknown");

// To add New Words route
router.get("/", middleware.isLoggedIn, function(req, res){
	res.render("vocabuildary");
})

// To Add new Words and add it to unknown
router.post("/", middleware.isLoggedIn, function(req, res){
	Words.create(req.body.word, function(err, newWord){
		if(err)
			return (console.log(err));
		var query = { _id: req.user.uid };
		Unknown.findById(query, function(err, foundUk){
			var uk = {
				_id: newWord._id,
				count: 1
			}
			foundUk.uWords.push(uk);
			foundUk.save();
			res.redirect("/vocabuildary");
		})
	})
})

module.exports = router;