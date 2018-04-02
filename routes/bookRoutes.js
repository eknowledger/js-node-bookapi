var express = require('express');
var chalk = require('chalk');

var routes = function(Book){
    var apiRoutes = express.Router();

    var bookController = require('../controllers/bookController')(Book);

    //get all
    apiRoutes.route('/')
        .post(bookController.post)
        .get(bookController.get);

    // creating middleware 
    apiRoutes.use('/:bookId', function(req,res,next){
        Book.findById(req.params.bookId, function(err, book){
            if(err){
                res.status(500).send(err);
                console.log(chalk.red(err));
            }
            else if (book){
                req.book = book;
                next();
            }
            else
                res.status(404).send('Book was not found');
        });
    });

    // get one
    apiRoutes.route('/:bookId')
        .get(function(req,res){
            var returnBook = req.book.toJSON();
            returnBook.links = {};
            var newLink = 'http://'+req.headers.host + '/api/books/?genre='+returnBook.genre;

            returnBook.links.FilterByThisGenre = newLink.replace(' ', '%20');
            // using findbook middleware
            res.json(returnBook);
        })
        .put(function(req,res){
            
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save(function(err){
                if(err){
                    res.status(500).send(err);
                    console.log(chalk.red(err));
                }
                else 
                    res.json(req.book);
            });
        })
        .patch(function(req,res){
            
            // strange that we delete _id from body, even tho req specfically say don't update id
            // return error is a better impl.
            if(req.body._id)
                delete req.body_id;

            // doesn't look like an efficient code to loop through all body and match on properties
            // also is not safe
            // i'm sure ther eare some nodejs package that can handle that nicely
            for(var p in req.body)
            {
                req.book[p] = req.body[p];
            }

            req.book.save(function(err){{
                if(err){
                    res.status(500).send(err);
                    console.log(chalk.red(err));
                }
                else 
                    res.json(req.book);
                
            }});

        })
        .delete(function(req,res){
            req.book.remove(function(err){{
                if(err){
                    res.status(500).send(err);
                    console.log(chalk.red(err));
                }
                else 
                    res.status(204).send('book removed');
                
            }});
        })
        ;

    return apiRoutes;

};

module.exports = routes;