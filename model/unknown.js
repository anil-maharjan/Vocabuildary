var mongoose = require("mongoose"),
	Schema 	 = mongoose.Schema;

var unknownSchema = new mongoose.Schema({
// uWords =  words
	uWords: [{
		name: String,
		meaning: String,
		synonyms: String,
		sentence: String,
		count: Number,
		noOfSentence: Number,
		sentence: String
	}]
})

module.exports = mongoose.model("Unknown", unknownSchema);