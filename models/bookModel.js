var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the schema for the entity/book model
var bookModel = new Schema({
    title:   {type: String},
    author : {type: String},
    genre:{type: String},
    read:{type:Boolean, default:false}
});

// export the book model to be used by the endpoint
module.exports = mongoose.model('Book', bookModel);