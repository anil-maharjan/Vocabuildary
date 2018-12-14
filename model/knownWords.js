var mongoose = require("mongoose"),
	Schema	 = mongoose.Schema;

var knownWordsSchema = new Schema({
	words:[{
			type: Schema.Types.ObjectId,
			ref: "Words"
		}]
})

module.exports = mongoose.model("KnownWords", knownWordsSchema);