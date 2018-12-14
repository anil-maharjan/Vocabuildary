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
router.get("/", middleware.isLoggedIn, middleware.remKWords, function(req, res){
	var rDef, rName, arrLength, randIndex, rand2, rId, i=0, arrWords=[];
	var query = { _id: req.user.uid };
	//If there are no words this line will give an error because words will be undefined solve this later
	Unknown.find(query).populate('uWords._id').exec(function(err, newArr){
		if(err){
			console.log(err);
		}
		arrLength = newArr[0].uWords.length;
		if(arrLength<4)
			return res.redirect("/vocabuildary");
		randIndex = randNum(arrLength);
		var temp  = newArr[0].uWords[randIndex]._id;
 		rId 	  = temp._id;
		rDef 	  = temp.meaning;
		rName	  = temp.name;
 		rand2 	  = randNum(4);
	 		Words.find({}, function(err, newWord){
		 		while(arrWords.length<4){
 					rand = randNum(arrLength); //get a random number from 0 - size of the array
			 		def  = newWord[rand].meaning;
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

// random number function
function randNum(num){
	return Math.floor(Math.random() * num);;
}

module.exports = router;