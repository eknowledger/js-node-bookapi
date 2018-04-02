var express = require('express');
var chalk = require('chalk');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

/*
    - Reference express
    - setup an app
    - setup a port
    - setup a route for root with a callback function to execute some log message
    - start a listener for express app on port 
*/
var db;

if(process.env.ENV == 'Test') // gulp task test will setup ENV env var to test, this will route to new test db
        db= mongoose.connect('mongodb://localhost/bookapi_test');
    else 
        db= mongoose.connect('mongodb://localhost/bookapi');
    
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

app.use(bodyParser.json()); // parse json object and add it to req.body
app.use(bodyParser.urlencoded({extended:true})); //

bookRouter = require('./routes/bookRoutes.js')(Book); // instantiate book router
app.use('/api/books', bookRouter);


// cmd: node app.js will fireup server listening on port 3000
app.listen(port, function(){
    console.log(chalk.green('Gulp is running book apis on PORT: ' + port));
});

module.exports = app;