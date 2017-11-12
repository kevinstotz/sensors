
var _ = require("lodash");
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var winston = require('winston');
var expressLayouts = require('express-ejs-layouts');
var cors = require('cors');
var logger = require('morgan');
var routes = require('./routes/index');
var sensors = require('./routes/sensors/index');
var auth = require('./routes/auth/index');
var launch  = require('./routes/launch/index');

var app = express();
app.use(session({resave: false, saveUninitialized: true, secret: 'xfdsfdsxxx',cookie : {secure: false}}));
var basePath = path.join(__dirname);

/*
if (responseObject.token) {
localStorage.setItem(‘token’, responseObject.token); //THIS IS THE ADDED LINE TO ADD ITEM
tokenElement.innerHTML = responseObject.token;
*/

winston.log('info', 'Hello distributed log files!');
winston.info('Hello again distributed logs');
winston.level = 'debug';
winston.log('debug', 'Now my debug messages are written to console!');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('env', 'development');
app.engine('html', require('ejs').renderFile);
app.enable('verbose errors');
// ROUTES

app.use('/static', express.static(path.join(__dirname, '/public/static')));
app.use('/partials', express.static(path.join(__dirname, 'partials')));
app.use('/sensors', sensors);
app.use('/auth', auth);
app.use('/launch', launch);
app.use('/', routes);
//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    req.session.authenticated = false;
    res.status(404).send('what???');
});
// END routes

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressLayouts);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 400;
    next(err);
});


if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            ressponse: res,
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

const ENGINE_URL = 'http://api.yogishouse.com:8000';
const port = 8080;
const hostname = '0.0.0.0';
app.listen(port, hostname);
console.log(`Running on http://${hostname}:${port}/`);
module.exports = app;
