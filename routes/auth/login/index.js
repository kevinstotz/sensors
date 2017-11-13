var router = require('express').Router();
var path = require('path');
var request = require('request');
var basePath = path.join(__dirname, '../../..');

router.get('/', function(req, res, next) {
    res.render('pages/authenticate/login/login', {basePath:basePath, authenticated:false});
});


module.exports = router;
