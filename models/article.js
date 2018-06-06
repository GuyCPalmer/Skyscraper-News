import { truncateSync } from "fs";

//require mongoose
var mongoose = require("mongoose");
//create schema
var schema = mongoose.Schema;

//create article schema
var ArticleSchema = new Schema({
    //title is a required string
    title: {
        type: String,
        required: true
    },
    //link is a required string
    link: {
        type: string,
        required: true
    },
    //summary is required
    summary: {
        type: string,
        required: true
    },
    //this should savee only one comment's ObjectId, ref refers to the comment model
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

//create the article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

//export
module.exports = Article;