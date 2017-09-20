var request = require("request");
var index = require("../routes/index.js");
var base_url = "http://localhost:3000/";

describe("Home page", function() {
    describe("GET /", function() {
        it("returns status code 200", function(done) {
            request.get(base_url, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                index.closeServer();
                done();
            });
        });
    });
});