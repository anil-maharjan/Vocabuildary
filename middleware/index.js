var middleware = {},
	Unknown    = require("../model/unknown");

// Middleware
middleware.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to that");
	res.redirect("/login");
}

middleware.remKWords = function(req, res, next){
	var query = { _id: req.user.uid }
	Unknown.findByIdAndUpdate(query, {$pull: {"uWords": {count: 0}}}, function(err, updatedUk){
			if(err)
				console.log(err);	
			return next();
	})
}

module.exports = middleware;