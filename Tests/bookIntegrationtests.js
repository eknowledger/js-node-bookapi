var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    agent = request.agent(app);


// creating end-to-end system tests 
// using supertest package to build system tests all the way from http calls down to test database
describe('Book CRUD Test', function(){
    it('Should allow a book to be posted return a read and _id', function(done){
        // create test book
        var bookPost = {title:'new Book', author:'Jon', genre:'Fiction'};

        // use super test agent to call app api post endpoint
        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end(function(err, results){
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done();
            });
    });

    afterEach(function(done){
        Book.remove().exec();
        done();
    })
});