var mongoose = require("mongoose"),
	Schema 	 = mongoose.Schema;

var unknownSchema = new mongoose.Schema({
// uWords =  words
	uWords: [{
				_id: {
						type: Schema.Types.ObjectId,
						ref: "Words"
					 },
				count: Number
			}]	
})

module.exports = mongoose.model("Unknown", unknownSchema);