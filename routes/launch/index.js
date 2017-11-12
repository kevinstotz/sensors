var router = require('express').Router();
var path = require('path');
var request = require('request');
var basePath = path.join(__dirname, '../..');


router.get('/*', function(req, res, next) {
  res.render(path.join(basePath,'/views/pages/launch/index'), {basePath:basePath, authenticated:false});
});

module.exports = router;
