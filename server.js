//dependencies
const express = require('express'),
      mongoose = require('mongoose'),
      exphbs = require('express-handlebars'),
      hbs = require('handlebars'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      path = require('path'); 

//scraping tools
const cheerio = require('cheerio'),
      request = require('request');

//initialize app
var app = express();

//require our note and article models
var Comment = require('./models/comment.js');
var Article = require('./models/article.js');

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articlesdb";

//set mongoose to leverage built in JS ES6 promises
//connect to Mongo DB
var db = mongoose.connection;
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//make pucblic static directory
app.use(express.static(__dirname + '/public'));
//app.use('/settings', express.static(__dirname + '/public'))
//app.use(express.static(process.cwd() + '/public'));
//app.use(express.static("public"));


//import routes/controllers
var router = require('./controllers/controller.js');
app.use('/', router);

//use morgan and body parser
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));

//handlebars
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

//mongoose and database
//mongoose.Promise = Promise;
//var db = mongoose.connection;
//mongoose.connect("mongodb://localhost/articlesdb")

//check for errors
db.on('error', function (error) {
    console.log('mongoose error: ', error);
});

//once logged in to the db, log a success message
db.once('open', function() {
    console.log('mongoose connection successful');
});


//listen on port
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Running on port: ' + port);
});