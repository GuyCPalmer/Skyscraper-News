//require mongoose
var mongoose = require("mongoose");
//create schema
var Schema = mongoose.Schema;

//create the comment schema
var CommentSchema = new Schema({

    // name
    author: {
      type: String
    },
    // actual comment
    content: {
      type: String
    }
    
  });

//create the comment model with the NoteSchema
var Comment = mongoose.model("Comment", CommentSchema);

//Export the note model
module.exports = Comment;