var expect  = require('chai').expect;
var request = require('request');
var constant = require('./constant');
var url = constant.url + 'user';
var authUser = {};

describe('User', function() {


    describe ('User Crud System:', function() {

        

        // get all user success
        it('get all User', function(done) {
            request.get({
                url : url + '/all',
            }, function(error, response, body) {
                expect(body).to.have.lengthOf.above(0);
                done();
            });
        });

         // get user by id
         it('get User by id', function(done) {
            request.get({
                url : url + '/5e6bd28b57bf372238e28ac9',
            }, function(error, response, body) {
                // console.log(response);
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        // get user by id
         it('get User by id not found', function(done) {
            request.get({
                url : url + '/notaid',
            }, function(error, response, body) {
                // console.log(response);
                expect(response.statusCode).to.equal(500);
                done();
            });
        });

        /// save wrong data
        it('save user with wrong data', function(done){
            var data = {
                accountName: "salman mustafa",
                email: 'salma',
                password: 'admin'
            };
            request.post({
                    url : url,
                    json: data
                },
                function(error, response, body) {
                expect(response.statusCode).to.equal(422);
                done();
            });
        });
        // add user
        it('Add User', function(done) {
            var data = {
                "email": "salman1@gmail.com",
                "password": "soikdf",
                "accountName": "salman"
            };
        
            request.post({
                url : url,
                    json: data
                }, function(error, response, body) {
                    // console.log('bodyyy add', response.statusCode);
                    // console.log('bodyyy', body);
                    expect(response.statusCode).to.equal(200);
                    done();
                });
        });

        // update user
        it('Update user', function(done) {
            var data = {
                accountName: "salman mustafa",
                email: 'salman@gmail.com',
                password: 'admin'
            };
            request.put({
                url : url + '/5e6bd28b57bf372238e28ac9' ,
                    json: data
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(200);
                    done();
                });
        });

        // update user with wrong id
        it('Update user with wrong id', function(done) {
            var data = {
                accountName: "salman mustafa",
                email: 'salman@gmail.com',
                password: 'admin'
            };
            request.put({
                url : url + '/afagaga' ,
                    json: data
                }, function(error, response, body) {
                    expect(response.statusCode).to.equal(500);
                    done();
                });
        });

    });

    
});



