var express	   = require("express"),
	//Express Routing acts as a middleware and all request goes through this
	router	   = express.Router(),
	mongoose   = require("mongoose"),
	Schema	   = mongoose.Schema,
	middleware = require('../middleware'),
	Words 	   = require("../model/words"),
	KnownWords = require("../model/knownWords"),
	Unknown	   = require("../model/unknown");

// Learn And Play route
router.get("/", middleware.isLoggedIn, function(req, res){
	var rDef, rName, arrLength, randIndex, rand2, rId, i=0, arrWords=[];
	var query = { _id: req.user.uid };
	//If there are no words this line will give an error because words will be undefined solve this later
	Unknown.findByIdAndUpdate(query, {$pull: {"uWords": {count: 0}}}, function(err, updatedUk){
			if(err)
				console.log(err);
		Unknown.findById(query, function(err, ukWords){
 		if(err){
 			console.log(err);
 		} 

		arrLength = ukWords.uWords.length;
		if(arrLength<4)
			return res.redirect("/vocabuildary");
		randIndex = Math.floor(Math.random()*arrLength);
 		rand2 	  = Math.floor(Math.random()*4);
 		rId 	  = ukWords.uWords[randIndex]._id;
 		query1    = { _id: req.user.uid };
 		Unknown.find(query1).populate('uWords._id').exec(function(err, newArr){
 			rDef  = newArr[0].uWords[randIndex]._id.meaning;
 			rName = newArr[0].uWords[randIndex]._id.name;
	 		Words.find({}, function(err, newWord){
		 		while(arrWords.length<4){
 					rand = Math.floor(Math.random()*arrLength); //get a random meaning from 0 - 9
			 		def = newWord[rand].meaning;
			 		if(def === rDef)
			 			continue;
			 		if(rand2===i)
			 			def=rDef;
			 		if(arrWords.indexOf(def)=== -1){
			 			arrWords.push(def);
			 			i++;	
			 		}
 				}
 			res.render("PlayAndLearn", {rName: rName, uIndex: randIndex, rId: rId, rIndex: rand2, arrWords: arrWords})
			})
		}) 
	})	
	})	 		
})

// Next route
router.post("/next", middleware.isLoggedIn, function(req, res){
	var query = {_id: req.user.uid};
		Unknown.findById(query, function(err, foundUk){
			// Check if clicked list and the right meaning of the words match
			if(req.body.rIndex === req.body.clkIndex)
			{	
				var id = mongoose.Types.ObjectId(req.body.rId);
				var count = foundUk.uWords[req.body.uIndex].count - 1;
				foundUk.uWords[req.body.uIndex].count-=1;
				foundUk.save();
				if(count===0){
					var query1 = { _id: req.user.kid };
					KnownWords.findById(query1, function(err, foundK){
						if(err)
							console.log(err);
						foundK.words.push(id);
						foundK.save();
					})
				}
			}
		})	
	
	res.redirect("/learnNplay");
})

module.exports = router;