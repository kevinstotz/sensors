var path = require('path');
var basePath = path.join(__dirname, '../../../');
var config = require(basePath+'config');
var router = require('express').Router();
var request = require('request');

router.get('/', function(req, res, next) {
   res.render('pages/register', {basePath:basePath, authenticated:false});
});

router.get('/verify/:Authorization_Code', function(req, res, next) {
   var get = config.engine_url + '/SES/v1/auth/verify/' + req.params.Authorization_Code;
   request(get,  function (error, response, body) {
       console.log('error:', error); // Print the error if one occurred
       console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
       console.log('body:', body); // Print the HTML for the Google homepage.
   });
   res.render('pages/register', {basePath:basePath, authenticated:false});
});

module.exports = router;
