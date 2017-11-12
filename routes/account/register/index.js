var router = require('express').Router();
var path = require('path');
var basePath = path.join(__dirname, '../../..');

router.get('/', function(req, res, next) {
    res.render('pages/account/register', {basePath:basePath, authenticated:true});
});

module.exports = router;
