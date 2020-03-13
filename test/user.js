var expect  = require('chai').expect;
var request = require('request');
var constant = require('./constant');
var url = constant.url;
var authUser = {};

describe('User', function() {


    describe ('Get User list', function() {
        it('status', function(done){
            request.post({
                    url : url
                },
                function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });


        it('get User', function(done) {
            request.get({
                url : url,
            }, function(error, response, body) {
                expect(body.data).to.have.lengthOf.above(0);
                done();
            });
        });

        // add user
        it('Add User', function(done) {
            var data = {
                accountName: "salman mustafa",
                email: 'salman@gmail.com',
                password: 'admin'
            };
        
            request.post({
                url : url + 'user',
                    json: data
                }, function(error, response, body) {
                    console.log('response', response);
                    console.log('bodyyy', body);
                    expect(body.code).to.equal(200);
                    done();
                });
        });

        // update user
        it('Update user', function(done) {
            var data = {
                _id: '5bfe2798c85c574830301413',
                accountName: "salman mustafa",
                email: 'salman@gmail.com',
                password: 'admin'
            };
            request.put({
                url : url + 'user',
                    json: data
                }, function(error, response, body) {
                    console.log('bodyyy update', body);
                    expect(body.code).to.equal(200);
                    done();
                });
        });

    });

    
});



