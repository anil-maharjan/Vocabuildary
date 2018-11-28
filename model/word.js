var mongoose = require("mongoose"),
	Schema	 = mongoose.Schema;

var vocabSchema = new Schema({
	name: String,
	meaning: String,
	synonyms: String,
	sentence: String
});


 
module.exports = mongoose.model("Vocabulary", vocabSchema); 