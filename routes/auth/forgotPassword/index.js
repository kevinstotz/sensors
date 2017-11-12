var router = require('express').Router();
var path = require('path');
var basePath = path.join(__dirname, '../../..');
var request = require('request');

router.get('/', function(req, res, next) {
    res.render('pages/authenticate/forgotPassword', {basePath:basePath, authenticated:false});
});

module.exports = router;
