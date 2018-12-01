var mongoose = require("mongoose");

var unknownSchema = new mongoose.Schema({
// uWords = unknown words
				words: [{
					_id:{
						type: mongoose.Schema.Types.ObjectId,
						ref: "Vocabulary"
					},
					count: Number,
					noOfSentence: Number,
					sentence: String
				}]
				
})

module.exports = mongoose.model("Unknown", unknownSchema);