var mongoose = require("mongoose"),
	Schema	 = mongoose.Schema;

var knownWordsSchema = new Schema({
	kWords:[{
		_id: false,
		words:{
			type: Schema.Types.ObjectId,
			ref: "Words.words"
		}
	}]
})

module.exports = mongoose.model("KnownWords", knownWordsSchema);