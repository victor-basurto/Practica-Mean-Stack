const express = require( 'express' ),
	path = require( 'path' ),
	morgan = require( 'morgan' ),
	bodyParser = require( 'body-parser' ),
	mongoose = require( 'mongoose' );

const appData = require( './appData.json' );

const app = express();
const Schema = mongoose.Schema;

// mongo connection
mongoose.connect( 'mongodb://localhost/login' );

// user data
let users = {
	nombre: String,
	email: String,
	password: String
};

// user schema
const user_Schema = new Schema( users ),
	User = mongoose.model( 'User', user_Schema );

app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.set( 'appData', appData ); // all static content from app
app.use( morgan( 'dev' ) );			// log every request to console
app.use( bodyParser.urlencoded({ 'extended':'true' }) );	// parse application/x-www-form-urlencoded
app.use( bodyParser.json() );		// parse application/json

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); 

app.locals.appData = appData;
let pageTitles = appData.content.utils;

// index route
app.get( '/', (req, res) => {
	res.render('index', { title: pageTitles.home });
});

// login route
app.get( '/login', (req, res) => {
	res.render( 'login', { title: pageTitles.login } );
});

// post route
app.post('/users', (req, res) => {
	const user = new User({
		nombre: req.body.nombre, 
		email: req.body.email, 
		password: req.body.password
	});

	/**
	 * [ user.save: object that holds data from user ]
	 * @param  {Object} `err` - err object
	 * @return [redirect user to route: localhost:8080/users and render `login.jade`]
	 */
	user.save( ( err ) => {
		// check users data
		console.log( user );

		// log error
		if ( err ) {
			console.log( err );
			res.render( 'login' );
		}

		// if no error send data to `test` route
		res.render( 'test', { user: user, title: pageTitles.utils } );
	});
});

// port connection
const port = process.env.PORT || 8080;

// server callback
app.listen( port, () => {
	console.log( 'Website is running on http://localhost:' + port );
});