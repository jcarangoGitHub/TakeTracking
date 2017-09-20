var express = require('express');
var router = express.Router();
var OAuth= require('oauth').OAuth;
var dateFormat = require('dateformat');
var domain='http://localhost:3000';

var tasksList = [{}];

/*call twitter*/
router.get('/auth/twitter', function(req, res){
    var oa = new OAuth(
        "https://api.twitter.com/oauth/request_token",
        "https://api.twitter.com/oauth/access_token",
        "Qqeiig8PkOWfCZ9owdHL8ZI5G",
        "jVUxZEi0znvrlYUaeIMvh8sPPdHx8lVpmbFXnQfzVWqfHNnRxD",
        "1.0",
        domain + "/auth/twitter/callback",
        "HMAC-SHA1"
    );
    oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
        console.log(error + '***' + oauth_token + '***' + oauth_token_secret);
        if (error) {
            console.log(error);
            res.send("yeah no. didn't work.")
        }
        else {
            res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token)
        }
    });
});

/*call back twitter*/
router.get('/auth/twitter/callback', function(req, res, next){
    var denied = req.param('denied');
    if(null != denied) {
        res.redirect(domain);
        return;
    }
    res.render('takeTracking', {tasksList: tasksList});
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', {});
});

router.post('/saveTask', function(req, res) {
    var name = req.param('taskName');
    var hours = req.param('thours');
    var minutes = req.param('tminutes');
    var seconds = req.param('tseconds');
    var thundredths = req.param('thundredths');
    var duration = hours + ":" + minutes + ":" + seconds + ":" + thundredths;
    if (duration == null || duration == undefined || duration == "0:0:0:0" || duration == ":::") {
        res.render('takeTracking', { tasksList: tasksList});
    }else{
        var row = {
            taskName : name,
            taskDuration : duration,
            dateUpdated : dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")
        };
        tasksList.unshift(row);
        res.render('takeTracking', { tasksList: tasksList});
    }

});

exports.closeServer = function(){
    server.close();
};

module.exports = router;
