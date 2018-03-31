var express = require('express');
var chalk = require('chalk');
var mongoose = require('mongoose');

/*
    - Reference express
    - setup an app
    - setup a port
    - setup a route for root with a callback function to execute some log message
    - start a listener for express app on port 
*/


var db = mongoose.connect('mongodb://localhost/bookapi');
var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.send('Book APIs v0.1');
});

/*
    Cleaner method to setup routes
    is to use express.Router()

    setup all routes then use app.use router 
*/
var apiRoutes = express.Router();

//get all
apiRoutes.route('/Books')
    .get(function(req,res){
        
        var queryString = req.query;
        var query = {};
        if(queryString.genre)
            query.genre = queryString.genre;

        Book.find(query, function(err, books){
            if(err){
                res.status(500).send(err);
                console.log(chalk.red(err));
            }
            else
                res.json(books);
        })

    });

    // get one
apiRoutes.route('/Books/:bookId')
    .get(function(req,res){
        
        Book.findById(req.params.bookId, function(err, book){
            if(err){
                res.status(500).send(err);
                console.log(chalk.red(err));
            }
            else
                res.json(book);
        })

    });

app.use('/api', apiRoutes);


// cmd: node app.js will fireup server listening on port 3000
app.listen(port, function(){
    console.log(chalk.green('Gulp is running book apis on PORT: ' + port));
});