var express	   = require("express"),
	router	   = express.Router(),
	mongoose   = require("mongoose"),
	Schema	   = mongoose.Schema,
	Vocabulary = require("../model/word"),
	KnownWords = require("../model/knownWords");
	Unknown	   = require("../model/unknown");
	 		//to get a random value between 0 and 3 which will be the right words index

router.get("/", function(req, res){
			// Add it to Known documents
			var query = {_id: "5c058ca44ba8de0e18333042"};
			Unknown.findByIdAndUpdate(query, {$pull: {"words": {count: 0}}}, function(err, updatedUk){
  				if(err){
  				 console.log(err)
  					}
  			});

		Unknown.find({}).populate("words._id").exec(function(err, uk){
	 		if(err){
	 			console.log(err);
	 		} 
			var arrLength = uk[0].words.length;
			if(arrLength<4){
				return res.redirect("/vocabuildary");
			}
	 		var i=-1, flag = true, arrWords = [], rand2 = Math.floor(Math.random()*4);
			 	while(arrWords.length<4){
			 		var rand = Math.floor(Math.random()*arrLength); //get a random meaning from 0 - 9
			 		var def = uk[0].words[rand]._id.meaning;
			 		if(arrWords.indexOf(def)=== -1){
			 			arrWords.push(def);
			 			i++;	
			 		}
			 		if(flag===true){
			 			if(rand2 === i)
			 			{
			 				var unknownIndex = rand;
			 				var rightId = uk[0].words[rand]._id._id;
			 				var rightName = uk[0].words[rand]._id.name;
			 				flag = false;
			 			}
	 				}
	 			}
	 	// R stands for Right
	 	res.render("PlayAndLearn", {allUWords: uk, R_name: rightName, uIndex: unknownIndex, R_id: rightId, R_index: rand2, arrWords: arrWords})
	})
})

router.post("/next", function(req, res){
		Unknown.find(function(err, foundUk){
			// Check if clicked list and the right meaning of the words match
			if(req.body.rIndex === req.body.clkIndex)
			{	
				var id = mongoose.Types.ObjectId(req.body.rId);
				var count = foundUk[0].words[req.body.uIndex].count - 1;
				foundUk[0].words[req.body.uIndex].count-=1;
				foundUk[0].save();
				if(count===0){
					KnownWords.find({}, function(err, foundK){
						if(err)
							console.log(err);
						foundK[0].id.push(id);
						foundK[0].save();
					})
				}
			}
		})	
	res.redirect("/learnNplay");
})

module.exports = router;