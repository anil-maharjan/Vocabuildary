var mongoose = require("mongoose"),
	Schema	 = mongoose.Schema;

var unknownSchema = new Schema({
// uWords = unknown words
		words: [{
			wid: [{
				type: Schema.Types.ObjectId,
				ref: "Vocabulary"
			}],
				count: Number,
				noOfSentence: Number,
				sentence: [String]
		}]
})

module.exports = mongoose.model("Unknown", unknownSchema);