var mongoose = require("mongoose"),
	Schema 	 = mongoose.Schema;

var wordsSchema = new mongoose.Schema({
// uWords =  words
	name: {type: String, required: true},
	meaning: {type: String, required: true},
	synonyms: String,
	sentence: String
})

module.exports = mongoose.model("Words", wordsSchema);