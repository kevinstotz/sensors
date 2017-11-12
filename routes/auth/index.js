var router = require('express').Router();
var path = require('path');
var request = require('request');
var basePath = path.join(__dirname, '../..');

router.use('/forgotPassword', require('./forgotPassword/index'));
router.use('/resetPassword', require('./resetPassword/index'));
router.use('/login', require('./login/index'));
router.use('/logout', require('./logout/index'));
router.use('/register', require('./register/index'));

router.get('/', function(req, res, next) {
  res.render('pages/index',{basePath:basePath, authenticated:false});
});


module.exports = router;
