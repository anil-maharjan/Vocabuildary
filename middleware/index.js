var middleware = {};

// Middleware
middleware.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to that");
	res.redirect("/login");
}

module.exports = middleware;