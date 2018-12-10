var express	   = require("express"),
	router	   = express.Router(),
	mongoose   = require("mongoose"),
	Schema	   = mongoose.Schema,
	KnownWords = require("../model/knownWords");
	Unknown	   = require("../model/unknown");

	 		//to get a random value between 0 and 3 which will be the right words index

router.get("/", function(req, res){
	console.log(req.user);
	var query = { _id: req.user.uid };
			//If there are no words this line will give an error because words will be undefined solve this later
			// Add it to Known documents
		Unknown.findByIdAndUpdate(query, {$pull: {"uWords": {count: 0}}}, function(err, updatedUk){
  			if(err){
  				console.log(err)
  			}
  			});

		Unknown.findById(query, function(err, ukWords){
	 		if(err){
	 			console.log(err);
	 		} 
	 		console.log(ukWords);
			var arrLength;
			arrLength = ukWords.uWords.length;
			console.log(arrLength);
			if(arrLength<4){
				return res.redirect("/vocabuildary");
			}
	 		var i=-1, flag = true, arrWords = [], rand2 = Math.floor(Math.random()*4);
			 	while(arrWords.length<4){
			 		var rand = Math.floor(Math.random()*arrLength); //get a random meaning from 0 - 9
			 		console.log(rand);
			 		var def = ukWords.uWords[rand].meaning;
			 		console.log(def);
			 		if(arrWords.indexOf(def)=== -1){
			 			arrWords.push(def);
			 			i++;	
			 		}
			 		if(flag===true){
			 			if(rand2 === i)
			  			{
			 				var unknownIndex = rand;
			 				var rightId = ukWords.uWords[rand]._id;
			 				var rightName = ukWords.uWords[rand].name;
			 				flag = false;
			 			}
	 				}
	 			}
	 	// R stands for Right
	 	res.render("PlayAndLearn", {R_name: rightName, uIndex: unknownIndex, R_id: rightId, R_index: rand2, arrWords: arrWords})
	})
})

// 

// router.post("/once", function(req, res){
// 	KnownWords.create({}, function(err, f){
// 		if(err)
// 			console.log(err);
// 	})
// })

router.post("/next", function(req, res){
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
					KnownWords.find({}, function(err, foundK){
						if(err)
							console.log(err);
						console.log(foundK);
						foundK[0].kWords.push(id);
						foundK[0].save();
					})
				}
			}
		})	
	res.redirect("/learnNplay");
})

module.exports = router;