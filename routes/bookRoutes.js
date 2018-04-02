var express = require('express');
var chalk = require('chalk');

var routes = function(Book){
    var apiRoutes = express.Router();

    //get all
    apiRoutes.route('/')
        .post(function(req,res){
            var book = new Book(req.body);

            book.save();
            console.log(chalk.blue(book));

            res.status(201).send(book); // 201 created

        })
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

            // using findbook middleware
            res.json(req.book);
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