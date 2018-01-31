'use strict';

var express = require('express'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    morgan = require('morgan'),
    restFul = require('express-method-override')('_method'),
    routes = require('./routes/msp-router.js'),
    faviconURL = `${__dirname}/public/img/favicon.ico`,
    publicDir = express.static(`${__dirname}/public`),
    viewDir = `${__dirname}/views`,
    port = (process.env.PORT || 3000),
    app = express();

require('./passport/passport')(passport)    

app
   .set('views', viewDir)
   .set('view engine', 'jade')
   .set('port', port)
   .use( favicon(faviconURL) )
   .use( bodyParser.json() )
   .use( bodyParser.urlencoded({extended: false}) )
   .use ( restFul )
   .use( morgan('dev') )
   .use( publicDir )
   .use(session({
    secret : 'secret',
    resave : false,
    saveUninitialized : false
    }))
   .use(passport.initialize())
   .use(passport.session())
   .use( routes )
   .use(cookieParser)   

module.exports = app;
