var mongoose = require("mongoose"),
	Schema	 = mongoose.Schema;

var knownWordsSchema = new Schema({
	id:[{
		type: Schema.Types.ObjectId,
		ref: "Vocabulary"
	}]
})

module.exports = mongoose.model("KnownWords", knownWordsSchema);