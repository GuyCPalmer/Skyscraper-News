//node dependencies
var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    logger = require("morgan"),
    mongoose = require("mongoose"),
    request = require("request"),
    cheerio = require("cheerio"),
    axios = require("axios");

//import the comment and article models
var Comment = require('../models/comment.js'),
    Article = require('../models/article.js');

//routes

//index page render
router.get('/', function (req, res){
    // Scrape data
    res.redirect('/scrape');
  });

//get request to scrape the website
router.get('/scrape', function (req, res) {
    //first grab the body of the html with request
    axios.get("https://www.archdaily.com").then(function(response) {
        //console.log(response);
        //load into cheerio and save it to $ for shorthand selector
        let $ = cheerio.load(response.data);
        //now grab every h2
        $(".afd-title-big afd-title-big--bmargin-small afd-mobile-margin").each(function(i, element) {
            //console.log("HERE");
            //save an empty result object
            var result = {};

            //add the text and href of every link and save them as property of result object
            var span= $(this).find("h3 a class").text();
            console.log(span);

            result.link = $(this).children("h3").text
            result.link = $(this).children("afd-title--black-link").attr("hrefafd-title--black-link");
            //result.summary = $(this).children("p.teaser").text();

            //using article model, create new entry
            //this passes the result object to the entry
            var entry = new Article(result);

            //save entry to the db
            entry.save(function(err, doc) {
                //log errors
                if (err) {
                    console.log(err);
                }
                //or log doc
                else {
                    console.log(doc);
                }
            });
        });
    }).catch(err => console.log(err));

    res.redirect("/articles");
});

//get articles scraped by mongodb
router.get("/articles", function(req, res) {
    //grab every doc in the article array
    Article.find({}, function(err, doc) {
        console.log(doc);
        //log errors
        if (err) {
            console.log(err);
        }
        //or store doc in hbsObject and render to index
        else {

            var hbsObject = {article: doc};
            return res.render('index', hbsObject);
        }
     });
});
    
//create a new note or replace an existing one
router.post("add/comment/:id", function(req, res) {
    //create new note and pass req.body to the entry
    var newComment = new Comment(req.body);
    //save the new note to the db
    newComment.save(function(error, doc) {
        //log errors
        if (error) {
            console.log(error);
        }
        //otherwise use the article id to find and update its note
        else {
            Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id})
            //execute above query
            .exec(function(err, doc) {
                //log errors
                if (err) {
                    console.log(err);
                }
                else {
                    //send document to browser
                    console.log("check the comments");
                    console.log(doc);
                    res.send(doc);
                }
            });
        }
    });
});

//delete a comment
router.post("/delete/comment/:id", function(req, res) {
    //collect comment id
    var commentId = req.params.Id;
    //find and remove comment using ID
    comment.findByIdAndRemove(commentId, function (err, todo) {
        if (err) {
            console.log(err);
        }
        else {
            //send success header
            res.sendStatus(200);
        }
    });
});

module.exports = router;