// $ npm install gulp-mocha should sinon --save
// gulp-mocha for writting unit test
// should for assertions
// sinon for moching

var should = require('should'),
    sinon = require('sinon');


describe('Book Controller Tests:', function(){
    describe('Post', function(){
        it('Should not allow empty title on book post', function(){
            
            // arrange
            var Book  = function(book){ // mock book object
                this.save = function(){}; // mock save
            };

            var req = {
                body:{
                    author: 'ahmed'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            // test
            var bookController = require('../controllers/bookController')(Book); // pass mock book object
            bookController.post(req,res);

            // mock assert
            res.status.calledWith(400).should.equal(true, 'Bad status: '+ res.status.args[0][0]); //args array of each time function is called and each argument passed each time
            res.send.calledWith('Title is required').should.equal(true);

        });
    });
});