var express = require( 'express' ),
	path = require( 'path' ),
	mongoose = require( 'mongoose' );

var app = express();
var Schema = mongoose.Schema;

mongoose.connect( "mongodb://localhost/login" );

var users = {
	nombre:String,
	email:String,
	password:String
};

var user_Schema = new Schema(users);
var User = mongoose.model("User", user_Schema);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.get("/",function(req, res){
	res.render("index");
});

app.post("/",function(req, res){
	User.find(function(err, doc){
		if(err){
			console.log(err);
		}
		else{
			res.render("login");
			console.log(doc);
		}
	});
});

app.post("/users", function(req, res){
	var user = new User({nombre: req.body.nombre, email: req.body.email, password: req.body.password});
	user.save(function(){
		res.send("Se guardaron los datos");
	});
});

var port = Number(8080);

app.listen(port, function(){
	console.log( 'Website is running on http://localhost:'+port );
});