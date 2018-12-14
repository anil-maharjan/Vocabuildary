var express  = require("express"),
	router	 = express.Router(),
	passport = require("passport"),
	User	 = require("../model/user"),
	Words 	 = require("../model/words"),
	Unknown	 = require("../model/unknown"),
	KnownWords = require("../model/knownWords");             

router.get("/register", function(req, res){
	res.render("register");
})

router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err)
		}
		passport.authenticate("local")(req, res, function(){
			Unknown.create({}, function(err, uk){
				if(err){
					console.log(err);
				}else{
					KnownWords.create({}, function(err, kWords){
						if(err){
							console.log(err);
						}else{
							user.uid = uk._id;
							user.kid = kWords._id;
							user.save();
						}
					})
				}
				res.redirect("/");
			})
		})
	})
})

router.get("/login", function(req, res){
	res.render("login");
})

router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login"
}), function(req, res){
})

router.get("/logout", function(req, res, next){
	req.logout();
	req.flash("success", "Logged you Out");
	res.redirect("/");
})

module.exports = router;