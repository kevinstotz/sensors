var router = require('express').Router();
var path = require('path');
var basePath = path.join(__dirname, '../..');

router.use('/profile', require('./profile/index'));

router.get('/', function(req, res, next) {
    res.render('pages/account/profile', {basePath:basePath, authenticated:false});
});

module.exports = router;
