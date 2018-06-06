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

//require our note and article models
var Comment = require('./models/comment.js');
var Article = require('./models/article.js');

//set mongoose to leverage built in JS ES6 promises
mongoose.Promise = Promise;

//initialize app
var app = express();

//use morgan and body parser
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));

//make pucblic static directory
app.use(express.static('public'));

//handlebars
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

//mongoose and database
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/SkyscraperNews", {
  useMongoClient: true
});

//check for errors
db.on('error', function (error) {
    console.log('mongoose error: ', error);
});

//once logged in to the db, log a success message
db.once('open', function() {
    console.log('mongoose connection successful');
});

//import routes/controllers
var router = require('./controllers/controller.js');
app.use('/', router);

//listen on port
app.listen(3000, function() {
    console.log('app is listening on port 3000');
});