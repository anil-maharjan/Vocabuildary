// App configuration
var express 	  = require("express"),
	app			  = express(),
	flash 		  = require("connect-flash"),
	request 	  = require("request"),
	bodyParser    = require("body-parser"),
	mongoose  	  = require("mongoose"),
	passport	  = require("passport"),
	LocalStrategy = require("passport-local"),
	Unknown 	  = require("./model/unknown"),
	User 		  = require("./model/user"),
	Words 		  = require("./model/words"),
	KnownWords    = require("./model/knownWords");

// Requiring routes
var indexRoutes		   = require("./routes/index"),
	learnRoutes		   = require("./routes/learn"),
	vocabuildaryRoutes = require("./routes/vocabuildary"),
	userRoutes		   = require("./routes/user"),
	knownwordsRoutes   = require("./routes/knownWords");

// Database connection
mongoose.connect("mongodb://localhost:27017/vocabuildary", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
// app.use(require("express-session")());
// app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "passport pani try handeko",
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error	   = req.flash("error");
	res.locals.success	   = req.flash("success");
	next();
})

//Use Routes
app.use(indexRoutes);
app.use("/knownWords", knownwordsRoutes);
app.use("/learnNplay", learnRoutes);
app.use(userRoutes);
app.use("/vocabuildary", vocabuildaryRoutes);
	
app.listen("3000", function(){
	console.log("Servers are running");
})