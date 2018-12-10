var mongoose 			  = require("mongoose"),
	Schema 	 			  = mongoose.Schema,
	passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new Schema({
	username: String,
	password: String,
	// uid = Unknown words id
	uid:{
		type: Schema.Types.ObjectId,
		ref: "Unknown"
	},
	kid:{
		type: Schema.Types.ObjectId,
		ref: "KnownWords"
	},
})

// Passport local mongoose defines the serialize and deserialize method for us so plugin is a method that does it for us
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);