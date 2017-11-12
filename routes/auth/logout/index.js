var router = require('express').Router();
var path = require('path');
var basePath = path.join(__dirname, '../../..');

router.get('/', function(req, res, next) {
    res.render('pages/launch/index', {basePath:basePath, authenticated:false});
});

module.exports = router;
