var express = require('express')
    , passport = require('passport')
    , util = require('util')
    , FacebookStrategy = require('passport-facebook').Strategy
    , https = require('https');

var FACEBOOK_APP_ID = "153602361475471";
var FACEBOOK_APP_SECRET = "66252e2149e279af9e580a035f02e69d";

var curProfile;
var curToken;

// TODO: This should be replaced by database adapter later                      
var dbPath      = 'mongodb://50.112.250.104/lendrDb';
// Import the data layer, should abstracted away later                          
var mongoose = require('mongoose');

var models = {
    Profile: require('./models/Profile')(app, mongoose),
    Friend: require('./models/Friend')(app, mongoose)
};
// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
	done(null, user);
    });

passport.deserializeUser(function(obj, done) {
	done(null, obj);
    });


// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
	    clientID: FACEBOOK_APP_ID,
	    clientSecret: FACEBOOK_APP_SECRET,
		callbackURL: "http://ec2-54-245-170-121.us-west-2.compute.amazonaws.com:8000/auth/facebook/callback"
		},
	function(accessToken, refreshToken, profile, done) {
	    curProfile = JSON.parse(profile._raw);
	    console.log(curProfile);
	    // asynchronous verification, for effect...
	    process.nextTick(function () {
		    // console.log(accessToken);
		    console.log(curProfile.id);
		    // TODO: set this from the callback

		    curToken = accessToken;
		    models.Profile.addUser(curProfile.id, JSON.stringify(curProfile), new Date());
		    
		    getFbData(accessToken, '/me/friends', function(data){
			    // console.log(data);
			    var friendsList = JSON.parse(data);
			    
			    for(var i=0; i<friendsList.data.length; i++){
				models.Friend.addFriend(curProfile.id, friendsList.data[i].id, new Date());
				// console.log(friendsList.data[i].id);
			    }
			});
		    
		    // To keep the example simple, the user's Facebook profile is returned to
		    // represent the logged-in user.  In a typical application, you would want
		    // to associate the Facebook account with a user record in your database,
		    // and return that user instead.
		    return done(null, profile);
		});
	}
	));




var app = express();

// configure Express
app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.logger());
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({ secret: 'keyboard cat' }));
	/*
	mongoose.connect(dbPath, function onMongooseError(err) {
                if (err) throw err;
            });
	*/
	// Initialize Passport!  Also use passport.session() middleware, to support
	// persistent login sessions (recommended).
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
    });


app.get('/', function(req, res){
	res.render('index', { user: req.user });
    });

app.get('/account', ensureAuthenticated, function(req, res){
	res.render('account', { user: req.user });
    });

app.get('/login', function(req, res){
	res.render('login', { user: req.user });
    });

// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback
app.get('/auth/facebook',
	passport.authenticate('facebook'),
	function(req, res){
	    // The request will be redirected to Facebook for authentication, so this
	    // function will not be called.
	});

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/facebook/callback', 
	passport.authenticate('facebook', { failureRedirect: '/login' }),
	function(req, res) {
	    res.redirect('/');
	});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
    });

app.get('/user/apply', function(req, res){
      	res.render('account', { user: req.user });
 });

app.listen(8000);
console.log('Lendrco server is istening on port 8000');


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}

function getFbData(accessToken, apiPath, callback) {
    var options = {
        host: 'graph.facebook.com',
        port: 443,
        path: apiPath + '?access_token=' + accessToken, //apiPath example: '/me/friends'
        method: 'GET'
    };

    var buffer = ''; //this buffer will be populated with the chunks of the data received from facebook
    var request = https.get(options, function(result){
	    result.setEncoding('utf8');
	    result.on('data', function(chunk){
		    buffer += chunk;
		});

	    result.on('end', function(){
		    callback(buffer);
		});
	});

    request.on('error', function(e){
	    console.log('error from facebook.getFbData: ' + e.message)
		});

    request.end();
}