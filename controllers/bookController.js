var chalk = require('chalk');

var bookController = function(Book){

    var post = function(req,res){
        var book = new Book(req.body);

        if(!req.body.title){
            res.status(400);
            res.send('Title is required');
        }
        else{
            book.save();
            console.log(chalk.blue(book));

            res.status(201);
            res.send(book); // 201 created
        }

    };

    var get = function(req,res){           
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

        };



    
    
        return {
        post: post,
        get: get
    };

};

module.exports = bookController;