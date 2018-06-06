//require mongoose
var mongoose = require("mongoose");
//create schema
var schema = mongoose.Schema;

//create the note schema
var CommentSchema = new Schema({
    //just a string
    body: string
});

//create the note model with the NoteSchema
var Comment = mongoose.model("Comment", CommentSchema);

//Export the note model
module.exports = Comment;