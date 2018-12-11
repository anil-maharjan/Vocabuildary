var mongoose = require("mongoose"),
	Schema 	 = mongoose.Schema;

var wordsSchema = new mongoose.Schema({
// uWords =  words
		words: [{
			_id: Schema.Types.ObjectId,
			name: String,
			meaning: String,
			synonyms: String,
			sentence: String
		}]
		
})

module.exports = mongoose.model("Words", wordsSchema);