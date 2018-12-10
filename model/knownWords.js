var mongoose = require("mongoose"),
	Schema	 = mongoose.Schema;

var knownWordsSchema = new Schema({
	kWords:[{
		type: Schema.Types.ObjectId,
		ref: "Unknown"
	}]
})

module.exports = mongoose.model("KnownWords", knownWordsSchema);